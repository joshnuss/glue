use Mix.Config

config :demo, :hooks, %{
  random: %{
    mod: Demo.Random,
    access: %{
      action: :value
    }
  },
  counter: %{
    mod: Demo.Counter,
    access: %{
      action: :get,
      label: :count,
      default: "..."
    },
    calls: [:increment, :decrement, :update]
  },
  array: %{
    mod: Demo.Array,
    access: %{
      action: :value,
      label: :array,
      default: []
    },
    calls: [:push, :get, :del, :clear]
  },
  dictionary: %{
    mod: Demo.Dictionary,
    access: %{
      action: :value,
      default: %{}
    },
    calls: [:put, :get, :del, :clear]
  }
}
