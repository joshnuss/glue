defmodule DemoWeb.Generator do
  defmacro generate_hooks() do
    hooks = Application.get_env(:demo, :hooks)

    Enum.map(hooks, fn {key, config} ->
      access_name = "#{key}:#{config.access.action}"

      base =
        quote do
          def handle_in(unquote(access_name), payload, socket) do
            value =
              apply(
                unquote(config.mod),
                unquote(config.access.action),
                payload["keys"] ++ payload["args"]
              )

            result = extract_result(value)

            {:reply, {:ok, result}, socket}
          end

          defp broadcast_change(socket, key, keys, state) do
            ids = Enum.join(keys, ":")
            broadcast_from!(socket, "#{key}:changed:#{ids}", %{state: state})
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
              keys = payload["keys"]
              value = apply(unquote(config.mod), unquote(call), keys ++ payload["args"])

              result = extract_result(value)

              if result.success do
                broadcast_change(socket, unquote(key), keys, result.state)
              end

              {:reply, {:ok, result}, socket}
            end
          end
        end)

      [base, calls]
    end)
  end
end
