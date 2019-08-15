use Mix.Config

config :phx_hooks, :hooks, %{
  counter: %{
    mod: PhxHooks.Counter,
    reader: :get,
    calls: [:increment, :decrement]
  }
}
