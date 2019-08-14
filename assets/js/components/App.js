import React, {useState} from 'react'

function useCounter() {
  const [count, set] = useState(0)

  return {
    count,
    increment: () => set(count + 1),
    decrement: () => set(count - 1)
  }
}

export default function() {
  const {count, increment, decrement} = useCounter()

  return (
    <div className="counter">
      <button className="decrement" onClick={() => decrement()}>-</button>
      <button className="increment" onClick={() => increment()}>+</button>

      <h2>{count}</h2>
    </div>
  )
}
