// This is the entry point for our client-side logic
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/logger'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import stores from './stores'
import autorun from './autorun'
import Index from '../pages/Index'

// We render our react app into this element
const container = document.getElementById('container')

// React to changes
autorun(stores)

// Render HTML on the browser
render(<AppContainer>
  <BrowserRouter>
    <Index stores={stores}/>
  </BrowserRouter>
</AppContainer>, container)

// Hot-reloading
if (module.hot) {
  module.hot.accept()
}
