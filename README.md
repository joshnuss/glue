# Easy server-side state with React & Phoenix

React is great at rendering HTML, but sharing state can be tricky.

There is a technology that is really good at this - the [actor model](https://en.wikipedia.org/wiki/Actor_model) in Erlang (aka GenServers). They eat massively parallel shared state for breakfast.

That means you can skip writing Redux, hooks, GraphQL/REST wrappers and just write simple GenServer code, all the hooks are generated for you.

## Counter Example

Here is what a simple counter looks like with React hooks:

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

Instead of `useState()`, we can swap it to use `useServerState()` instead: 

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

Now the state will be queried from the the server. Any changes will be synced between all connected users.

You just need to define a GenServer to handle the hold the state on the backend:

```elixir
defmodule Counter do
  use Agent

  @name :counter

  def start_link(_opts) do
    Agent.start_link(fn -> 0 end, name: @name)
  end

  def get() do
    Agent.get(@name, & &1)
  end

  def increment() do
    apply(+1)
  end

  def decrement() do
    apply(-1)
  end

  defp apply(delta) do
    Agent.get_and_update(@name, &{&1 + delta, &1 + delta})
  end
end
```

That's it! All you need is `GenServer`'s and pure JSX components.

### This is alpha software.
