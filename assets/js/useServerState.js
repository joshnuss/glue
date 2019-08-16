import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from './channel'

const hooks = JSON.parse(document.querySelector('script#hooks').innerHTML)

export default function useServerState(actor) {
  const config = hooks[actor]

  if (!config) {
    console.error(`Hook not defined in config/hooks.exs for ${name}`)
    return
  }

  const {access, calls} = config
  const [value, set] = useState(access.default)
  const update = ({value: change}) => set(change)

  useEffect(() => {
    call(`${actor}:${access.action}`).then(update)

    const ref = subscribe(`${actor}:changed`, update)

    return () => unsubscribe(`${actor}:changed`, ref)
  })

  const operations = {}

  operations[access.label] = value

  calls.forEach(callName => {
    operations[callName] = (...args) => call(`${actor}:${callName}`, ...args).then(update)
  })

  return operations
}
