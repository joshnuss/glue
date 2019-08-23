import React from 'react'
import {useServerState} from '@glue/react'

const Item = ({value, onRemove}) => {
  const confirmRemove = () => {
    if (confirm(`Are you sure you want to remove ${value}?`)) {
      onRemove()
    }
  }

  return (
    <tr>
      <td>{value}</td>
      <td><button type="button" className="remove" onClick={confirmRemove}><span className="fa fa-trash"/></button></td>
    </tr>
  )
}

const Items = ({array, onDelete}) => {
  return array.map((value, index) =>
    <Item key={value} value={value} onRemove={() => onDelete(index)}/>
  )
}

const AddForm = () => {
  return (
    <tr className="add">
      <td><input id="value" placeholder="new item" required autoFocus/></td>
      <td><button className="add"><span className="fa fa-plus"/></button></td>
    </tr>
  )
}

export default function() {
  const {array, push, del, clear} = useServerState('array', {sync: true})
  const submit = (e) => {
    e.preventDefault()

    const form = e.target
    const elements = form.elements

    push(elements.value.value)

    form.reset()
    elements.value.focus()
  }

  return (
    <div className="dictionary">
      <form onSubmit={submit}>
        <table>
          <thead>
            <tr>
              <th colSpan="2">Item</th>
            </tr>
          </thead>
          <tbody>
            {array.length === 0 && <tr><td colSpan="2">No entries found.</td></tr>}

            <Items array={array} onDelete={del}/>

            <AddForm/>
          </tbody>
        </table>
      </form>

      {array.length > 0 && <a onClick={() => clear()}>clear</a>}

      <pre><code>{JSON.stringify(array, null, 2)}</code></pre>
    </div>
 )
}
