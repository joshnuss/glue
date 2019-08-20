import React from 'react'
import {useServerState} from '@glue/react'

export default function() {
  const {value} = useServerState('random')

  return <h2>{value}</h2>
}
