use Mix.Config

config :phx_hooks, :hooks, %{
  counter: %{
    mod: PhxHooks.Counter,
    access: %{
      action: :get,
      label: :count,
      default: "..."
    },
    calls: [:increment, :decrement, :update]
  }
}
