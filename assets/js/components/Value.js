import React from 'react'
import useServerState from '../useServerState'

export default function() {
  const {value} = useServerState('random')

  return <h2>{value}</h2>
}
