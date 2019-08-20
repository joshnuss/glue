defmodule Glue.View do
  use Phoenix.HTML

  def hooks_config(app) do
    config = Application.get_env(app, :hooks)

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
