defmodule PhxHooks.Dictionary do
  use Agent

  @name __MODULE__

  def start_link(_opts) do
    Agent.start_link(fn -> %{} end, name: @name)
  end

  def value, do: Agent.get(@name, & &1)

  def put(key, value) do
    Agent.get_and_update(@name, fn state ->
      new_state = Map.put(state, key, value)
      {new_state, new_state}
    end)
  end

  def get(key) do
    Agent.get(@name, fn state ->
      value = Map.get(state, key)

      {:ok, value, state}
    end)
  end

  def del(key) do
    Agent.get_and_update(@name, fn state ->
      new_state = Map.delete(state, key)
      {new_state, new_state}
    end)
  end

  def clear() do
    Agent.update(@name, fn _ -> %{} end)
    %{}
  end
end
