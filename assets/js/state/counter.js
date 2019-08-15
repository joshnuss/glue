import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from './channel'

export default function useCounter() {
  const [count, set] = useState(0)
  const update = ({value}) => set(value)

  useEffect(() => {
    call("counter:get").then(update)

    const ref = subscribe("counter:changed", update)

    return () => unsubscribe("counter:changed", ref)
  })

  return {
    count,
    increment: () => call("counter:increment").then(update),
    decrement: () => call("counter:decrement").then(update)
  }
}
