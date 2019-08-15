use Mix.Config

config :phx_hooks, :hooks, %{
  counter: %{
    mod: PhxHooks.Counter,
    reader: %{
      action: :get,
      label: :count
    },
    calls: [:increment, :decrement, :update]
  }
}
