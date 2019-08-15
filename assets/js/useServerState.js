import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from './channel'

const hooks = JSON.parse(document.querySelector('script#hooks').innerHTML)

export default function useServerState(actor) {
  const config = hooks[actor]

  if (!config) {
    console.error(`Hook not defined in config/hooks.exs for ${name}`)
    return
  }

  const [value, set] = useState(0)
  const update = ({value: change}) => set(change)

  useEffect(() => {
    call(`${actor}:${config.reader.action}`).then(update)

    const ref = subscribe(`${actor}:changed`, update)

    return () => unsubscribe(`${actor}:changed`, ref)
  })

  const operations = {}

  operations[config.reader.label] = value

  config.calls.forEach(callName => {
    operations[callName] = () => call(`${actor}:${callName}`).then(update)
  })

  return operations
}
