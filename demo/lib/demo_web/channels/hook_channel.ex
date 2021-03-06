defmodule DemoWeb.HookChannel do
  use DemoWeb, :channel
  import Glue.Generator

  def join("hook:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  generate_hooks(:demo)

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
