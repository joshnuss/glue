defmodule PhxHooksWeb.Generator do
  defmacro generate_hooks() do
    hooks = Application.get_env(:phx_hooks, :hooks)

    Enum.map(hooks, fn {key, config} ->
      reader_name = "#{key}:#{config.reader}"

      base =
        quote do
          def handle_in(unquote(reader_name), _payload, socket) do
            value = apply(unquote(config.mod), unquote(config.reader), [])

            {:reply, {:ok, %{value: value}}, socket}
          end

          defp broadcast_change(socket, value) do
            broadcast_from!(socket, "#{unquote(key)}:changed", %{value: value})
          end
        end

      calls =
        Enum.map(config.calls, fn call ->
          call_name = "#{key}:#{call}"

          quote do
            def handle_in(unquote(call_name), _payload, socket) do
              value = apply(unquote(config.mod), unquote(call), [])

              broadcast_change(socket, value)

              {:reply, {:ok, %{value: value}}, socket}
            end
          end
        end)

      [base, calls]
    end)
  end
end
