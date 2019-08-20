defmodule Demo.Counter do
  use Agent

  @name __MODULE__

  def start_link(_opts) do
    Agent.start_link(fn -> 0 end, name: @name)
  end

  def get, do: Agent.get(@name, & &1)
  def increment, do: change(&(&1 + 1))
  def decrement, do: change(&(&1 - 1))
  def update(value), do: change(fn _ -> value end)

  defp change(fun) do
    Agent.get_and_update(@name, &{fun.(&1), fun.(&1)})
  end
end
