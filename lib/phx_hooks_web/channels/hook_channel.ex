defmodule PhxHooksWeb.HookChannel do
  use PhxHooksWeb, :channel
  alias PhxHooks.Counter

  def join("hook:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("get", payload, socket) do
    value = Counter.get()

    {:reply, {:ok, %{value: value}}, socket}
  end

  def handle_in("increment", payload, socket) do
    value = Counter.increment()

    broadcast_change(socket, value)

    {:reply, {:ok, %{value: value}}, socket}
  end

  def handle_in("decrement", payload, socket) do
    value = Counter.decrement()

    broadcast_change(socket, value)

    {:reply, {:ok, %{value: value}}, socket}
  end

  defp broadcast_change(socket, value) do
    broadcast_from!(socket, "changed", %{value: value})
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
