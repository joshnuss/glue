defmodule DemoWeb.LayoutView do
  use DemoWeb, :view

  def hooks_config do
    config = Application.get_env(:demo, :hooks)

    config
    |> Enum.map(fn {k, v} ->
      {k,
       %{
         access: v.access,
         calls: v[:calls] || []
       }}
    end)
    |> Enum.into(%{})
    |> Jason.encode!()
    |> raw()
  end
end
