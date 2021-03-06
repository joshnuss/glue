// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from '../css/app.scss'

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import 'phoenix_html'

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import React from 'react'
import ReactDOM from 'react-dom'
import {init} from '@glue/core'
import Counter from './components/Counter'
import Value from './components/Value'
import Dictionary from './components/Dictionary'
import ArrayComponent from './components/Array'

const apps = {
  "counter-app": Counter,
  "read-only-app": Value,
  "array-app": ArrayComponent,
  "dictionary-app": Dictionary
}

init()
  .then(() => {
    Object.entries(apps).forEach(([id, Component]) => {
      const element = document.getElementById(id)

      if (element) {
        ReactDOM.render(<Component/>, element)
      }
    })
  })
  .catch(error => console.log('Unable to join', error))
