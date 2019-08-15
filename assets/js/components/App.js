import React from 'react'
import useServerState from '../useServerState'

export default function() {
  const {count, increment, decrement, update} = useServerState('counter')

  return (
    <div className="counter">
      <button className="decrement" onClick={() => decrement()}>-</button>
      <button className="increment" onClick={() => increment()}>+</button>

      <h2>{count}</h2>

      <a onClick={() => update(Math.floor(Math.random()*20))}>I'm feeling lucky!</a>
    </div>
  )
}
