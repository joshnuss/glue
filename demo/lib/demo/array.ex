defmodule Demo.Array do
  use Agent

  @name __MODULE__

  def start_link(_opts) do
    Agent.start_link(fn -> [] end, name: @name)
  end

  def value, do: Agent.get(@name, & &1)

  def push(item) do
    Agent.get_and_update(@name, fn state ->
      new_state = [item | state]
      {new_state, new_state}
    end)
  end

  def get(index) do
    Agent.get(@name, fn state ->
      value = Enum.at(state, index)

      {:ok, value, state}
    end)
  end

  def del(index) do
    Agent.get_and_update(@name, fn state ->
      new_state = List.delete_at(state, index)
      {new_state, new_state}
    end)
  end

  def clear() do
    Agent.update(@name, fn _ -> [] end)
    []
  end
end
