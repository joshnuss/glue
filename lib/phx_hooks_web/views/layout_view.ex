defmodule PhxHooksWeb.LayoutView do
  use PhxHooksWeb, :view

  def hooks_config do
    config = Application.get_env(:phx_hooks, :hooks)

    config
    |> Enum.map(fn {k, v} ->
      {k,
       %{
         access: v.access,
         calls: v.calls
       }}
    end)
    |> Enum.into(%{})
    |> Jason.encode!()
    |> raw()
  end
end
