# Minimal Example

The most basic example is using read-only state.

## Server Side

All you need is a module:

```elixir
# in lib/magic.ex

defmodule Magic do
  # read-only value
  def value, do: 42
end
```

Make the hook public:

```elixir
# in config/hooks.ex

config :my_app, :hooks, %{
  # `magic` is the name of the hook
  magic: %{
    # it uses the `Magic` module
    mod: Magic,
    # we allow the client to access `Magic.value/0`
    access: %{
      action: :value,
    }
  }
}
```

## Client side

Retreive the state with `useServerState()` hook.

```javascript
# in src/components/Magic.js
import React from 'react'
import {useServerState} from 'react-server-state'

export default function() {
  const {value} = useServerState('magic')

  return <h1>{value}</h1>
}
```
