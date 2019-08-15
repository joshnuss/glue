// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import React from 'react'
import ReactDOM from 'react-dom'
import {init} from "./state/channel"
import App from './components/App'

const element = document.getElementById('app')

init()
  .then(() => ReactDOM.render(<App/>, element))
  .catch(error => console.log("Unable to join", error))
