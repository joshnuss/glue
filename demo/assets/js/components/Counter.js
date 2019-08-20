import React from 'react'
import {useServerState} from '@glue/react'

function randomNumber() {
  return Math.floor(Math.random()*100)
}

export default function() {
  const {count, increment, decrement, update} = useServerState('counter', {sync: true})

  return (
    <div className="counter">
      <button className="decrement" onClick={() => decrement()}>-</button>
      <h2>{count}</h2>
      <button className="increment" onClick={() => increment()}>+</button>

      <a onClick={() => update(randomNumber())}>I'm feeling lucky!</a>
    </div>
 )
}
