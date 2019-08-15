# Phoenix + React + GenServers + Sockets + Generated hooks

React is great at rendering HTML, but sharing state can be tricky.

There is a technology that is really good at this - the [actor model](https://en.wikipedia.org/wiki/Actor_model) in Erlang (aka GenServers). They eat massively parallel shared state for breakfast.

That means you can skip writing redux, hooks, graphql/rest wrappers and just write simple GenServer code, all the hooks are generated for you.

# Counter Example

Here is what a simple shared counter looks like with React hooks

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

Instead of `useState()`, we can switch it to use `useServerState()` instead. This will provide state management over sockets to your erlang cluster.

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

Just define a GenServer to handle the state on the backend:

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

Now you can share state across many machines quite easily.


**Alpha code***
