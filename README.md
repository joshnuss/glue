# Easy server-side state with React & Phoenix

React is great at rendering HTML, but sharing state can be tricky.

One technology that is designed for managing large amounts of shared state is the [Actor Model](https://en.wikipedia.org/wiki/Actor_model), known in Erlang as `GenServer`. 

By relying on Erlang for state management, it frees us from needing to write boilerplate Redux, hooks and/or GraphQL/REST wrappers and just write GenServer code. The React and Websocket code is generated for you.

It also makes colloborative apps much faster to build.

## Counter Example

Let's take the example of a simple counter. This is what it looks like with React hooks:

```js
import React, {useState} from 'react'

export default function() {
  const [count, set] = useState(0)

  return (
    <div>
      <button onClick={() => set(count + 1)}>-</button>
      <button onClick={() => set(count - 1)}>+</button>

      <h2>{count}</h2>
    </div>
  )
}
```

Instead of storing state in the local browser's memory with `useState()`, we can switch to server-side state by simply swapping `useState()` to the super-powered `useServerState()`: 

```js
import React from 'react'
import useServerState from '../useServerState'

export default function() {
  const {count, increment, decrement} = useServerState('counter')
  
  return (
    <div className="counter">
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => increment()}>+</button>

      <h2>{count}</h2>
    </div>
  )
}
```

The state will first be queried from the server. Subsequent changes will be synced back to the server and then between all connected users via Websockets.

Now we just need to define a `GenServer` to hold the state in the backend:

```elixir
defmodule Counter do
  use Agent

  @name :counter

  def start_link(_opts),
    do: Agent.start_link(fn -> 0 end, name: @name)

  def get(), do: Agent.get(@name, & &1)
  def increment(), do: apply(+1)
  def decrement(), do: apply(-1)

  defp apply(delta) do
    Agent.get_and_update(@name, &{&1 + delta, &1 + delta})
  end
end
```

That's it! Just `GenServer`'s and pure JSX components.

![Counter example](/counter-example.gif)

### This is alpha software.
