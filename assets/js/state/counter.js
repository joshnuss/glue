import {useState} from 'react'

export default function useCounter() {
  const [count, set] = useState(0)

  return {
    count,
    increment: () => set(count + 1),
    decrement: () => set(count - 1)
  }
}
