defmodule PhxHooksWeb.Generator do
  defmacro generate_hooks() do
    hooks = Application.get_env(:phx_hooks, :hooks)

    Enum.map(hooks, fn {key, config} ->
      access_name = "#{key}:#{config.access.action}"

      base =
        quote do
          def handle_in(unquote(access_name), payload, socket) do
            value = apply(unquote(config.mod), unquote(config.access.action), payload["args"])

            result = extract_result(value)

            {:reply, {:ok, result}, socket}
          end

          defp broadcast_change(socket, value) do
            broadcast_from!(socket, "#{unquote(key)}:changed", %{value: value})
          end

          defp extract_result(value) do
            case value do
              {:ok, x} -> %{success: true, value: x, state: x}
              {:ok, x, state} -> %{success: true, value: x, state: x}
              {:error, x} -> %{success: false, value: x}
              x -> %{success: true, value: x, state: x}
            end
          end
        end

      calls =
        Enum.map(config[:calls] || [], fn call ->
          call_name = "#{key}:#{call}"

          quote do
            def handle_in(unquote(call_name), payload, socket) do
              value = apply(unquote(config.mod), unquote(call), payload["args"])

              result = extract_result(value)

              if result.success do
                broadcast_change(socket, result.state)
              end

              {:reply, {:ok, result}, socket}
            end
          end
        end)

      [base, calls]
    end)
  end
end
