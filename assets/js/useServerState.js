import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from './channel'
import hooks from '../static/hooks.json'

export default function useServerState(actor) {
  const config = hooks[actor]

  if (!config) {
    console.error(`Hook not defined in config/hooks.exs for ${name}`)
    return
  }

  const [value, set] = useState(0)
  const update = ({value: change}) => set(change)

  useEffect(() => {
    call(`${actor}:${config.reader.actionName}`).then(update)

    const ref = subscribe(`${actor}:changed`, update)

    return () => unsubscribe(`${actor}:changed`, ref)
  })

  const operations = {}

  operations[config.reader.varName] = value

  config.calls.forEach(callName => {
    operations[callName] = () => call(`${actor}:${callName}`).then(update)
  })

  return operations
}
