use Mix.Config

config :phx_hooks, :hooks, %{
  counter: %{
    mod: PhxHooks.Counter,
    reader: %{
      default: "...",
      action: :get,
      label: :count
    },
    calls: [:increment, :decrement, :update]
  }
}
