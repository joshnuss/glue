# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :phx_hooks, PhxHooksWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "6rIwsZ0cDNSH9UOkP4oJ9Xv4cuHxKg6N1Cymoqzo5iWUEGxwQVJGyHWENCt3EMgY",
  render_errors: [view: PhxHooksWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhxHooks.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

alias PhxHooks.Counter

config :phx_hooks, :hooks, %{
  counter: %{
    mod: PhxHooks.Counter,
    reader: :get,
    calls: [:increment, :decrement]
  }
}
