import React from 'react'
import useCounter from '../state/counter'

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
