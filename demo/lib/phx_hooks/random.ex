defmodule PhxHooks.Random do
  def value, do: :rand.uniform(1000)
end
