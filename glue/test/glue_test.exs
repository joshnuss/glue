defmodule GlueTest do
  use ExUnit.Case
  doctest Glue

  test "greets the world" do
    assert Glue.hello() == :world
  end
end
