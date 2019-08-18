import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from './channel'

const hooks = JSON.parse(document.querySelector('script#hooks').innerHTML)

function parseKeys(options) {
  const key = options['key']

  if (!key) return []
  if (Array.isArray(key)) return key

  return [key]
}

export default function useServerState(actor, options={}) {
  const config = hooks[actor]

  if (!config) {
    console.error(`Hook not defined in config/hooks.exs for ${name}`)
    return
  }

  const {access, calls} = config
  const keys = parseKeys(options)
  const label = access['label'] || access.action
  const [value, set] = useState(access.default)
  const update = ({value: change}) => set(change)

  useEffect(() => {
    call(`${actor}:${access.action}`, ...keys).then(update)

    const ref = subscribe(`${actor}:changed`, update)

    return () => unsubscribe(`${actor}:changed`, ref)
  }, [actor])

  const operations = {}

  operations[label] = value

  calls.forEach(callName => {
    operations[callName] = async (...args) => {
      const result = await call(`${actor}:${callName}`, ...keys, ...args)

      update(result)

      return result.value
    }
  })

  return operations
}
