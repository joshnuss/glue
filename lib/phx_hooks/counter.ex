defmodule PhxHooks.Counter do
  use Agent

  @name __MODULE__

  def start_link(_opts) do
    Agent.start_link(fn -> 0 end, name: @name)
  end

  def get() do
    Agent.get(@name, & &1)
  end

  def increment() do
    apply(&(&1 + 1))
  end

  def decrement() do
    apply(&(&1 - 1))
  end

  def update(value) do
    apply(fn _ -> value end)
  end

  defp apply(fun) do
    Agent.get_and_update(@name, &{fun.(&1), fun.(&1)})
  end
end
