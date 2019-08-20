import socket from "./socket"

let channel

export function init() {
  return new Promise((resolve, reject) => {
    channel = socket.channel("hook:lobby")

    channel.join()
      .receive("ok", () => resolve(channel))
      .receive("timeout", () => reject('timeout'))
      .receive("error", error => reject(error))
  })
}

export function subscribe(name, callback) {
  return channel.on(name, callback)
}

export function unsubscribe(name, ref) {
  channel.off(name, ref)
}

export function call(name, keys, args=[]) {
  return new Promise((resolve, reject) => {
    channel.push(name, {keys, args})
        .receive("ok", resolve)
        .receive("timeout", () => {
          console.error(`call to ${name} timed out`)
          reject('timeout')
        })
        .receive("error", error => {
          console.error(`call to ${name} errored`, error)
          reject(error)
        })
  })
}
