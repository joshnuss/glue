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
    apply(+1)
  end

  def decrement() do
    apply(-1)
  end

  defp apply(delta) do
    Agent.get_and_update(@name, &{&1 + delta, &1 + delta})
  end
end
