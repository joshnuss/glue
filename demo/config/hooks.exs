use Mix.Config

config :phx_hooks, :hooks, %{
  random: %{
    mod: PhxHooks.Random,
    access: %{
      action: :value
    }
  },
  counter: %{
    mod: PhxHooks.Counter,
    access: %{
      action: :get,
      label: :count,
      default: "..."
    },
    calls: [:increment, :decrement, :update]
  },
  dictionary: %{
    mod: PhxHooks.Dictionary,
    access: %{
      action: :value,
      default: %{}
    },
    calls: [:put, :get, :del, :clear]
  }
}
