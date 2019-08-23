import React from 'react'
import {useServerState} from '@glue/react'

const Pair = ({id, value, onRemove}) => {
  const confirmRemove = () => {
    if (confirm(`Are you sure you want to remove ${id}?`)) {
      onRemove()
    }
  }

  return (
    <tr>
      <td><b>{id}</b></td>
      <td>{value}</td>
      <td><button type="button" className="remove" onClick={confirmRemove}><span className="fa fa-trash"/></button></td>
    </tr>
  )
}

const Pairs = ({pairs, onDelete}) => {
  return pairs.map(([key, value]) =>
    <Pair key={key} id={key} value={value} onRemove={() => onDelete(key)}/>
  )
}

const AddForm = () => {
  return (
    <tr className="add">
      <td><input id="key" placeholder="key" required autoFocus/></td>
      <td><input id="value" placeholder="value" required/></td>
      <td><button className="add"><span className="fa fa-plus"/></button></td>
    </tr>
  )
}

export default function() {
  const {value, put, del, clear} = useServerState('dictionary', {sync: true})
  const pairs = Object.entries(value)
  const submit = (e) => {
    e.preventDefault()

    const form = e.target
    const elements = form.elements

    put(elements.key.value, elements.value.value)

    form.reset()
    elements.key.focus()
  }


  return (
    <div className="dictionary">
      <form onSubmit={submit}>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th colSpan="2">Value</th>
            </tr>
          </thead>
          <tbody>
            {pairs.length === 0 && <tr><td colSpan="3">No entries found.</td></tr>}

            <Pairs pairs={pairs} onDelete={del}/>

            <AddForm/>
          </tbody>
        </table>
      </form>

      {pairs.length > 0 && <a onClick={() => clear()}>clear</a>}

      <pre><code>{JSON.stringify(value, null, 2)}</code></pre>
    </div>
 )
}
