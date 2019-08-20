import {useState, useEffect} from 'react'
import {call, subscribe, unsubscribe} from '@glue/core'

const hooks = JSON.parse(document.querySelector('script#hooks').innerHTML)
const actors = new Map()

function parseKeys(options) {
  const key = options['key']

  if (!key) return []
  if (Array.isArray(key)) return key

  return [key]
}

function getOrCreateActor(actorName, keys, config, options) {
  const {access} = config
  const fullName = [actorName, ...keys]
  const eventName = `${actorName}:changed:${keys.join(':')}`
  let actor = actors[fullName]

  if (actor) return actor

  actor = {
    value: access.default,
    sync: options.sync,
    listeners: [],
    subscription: null,
    addListener(callback) {
      this.listeners.push(callback)

      if (this.sync && !this.subscription) {
        this.subscription = subscribe(eventName, ({state}) => this.update(state))
      }

      callback(this.value)
    },
    removeListener(callback) {
      const index = this.listeners.indexOf(callback)
      if (index) this.listeners.splice(index, 1)

      if (this.sync && this.listeners.length === 0) {
        unsubscribe(eventName, this.subscription)
      }
    },
    update(newValue) {
      this.value = newValue
      this.listeners.forEach(cb => cb(newValue))
    }
  }

  actors[fullName] = actor

  call(`${actorName}:${access.action}`, keys).then(({state}) => actor.update(state))

  return actor
}

export function useServerState(actorName, options={}) {
  const config = hooks[actorName]

  if (!config) {
    console.error(`Hook not defined in config/hooks.exs for ${name}`)
    return
  }

  const {access, calls} = config
  const keys = parseKeys(options)
  const label = access['label'] || access.action
  const actor = getOrCreateActor(actorName, keys, config, options)
  const [value, set] = useState(actor.value)

  useEffect(() => {
    actor.addListener(set)

    return () => actor.removeListener(set)
  }, [actorName])

  const operations = {}

  operations[label] = value

  calls.forEach(callName => {
    operations[callName] = async (...args) => {
      const result = await call(`${actorName}:${callName}`, keys, args)

      if (!result.success) {
        throw Error(result.value)
      }

      actor.update(result.state)

      return result.value
    }
  })

  return operations
}
