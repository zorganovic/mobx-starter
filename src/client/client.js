// This is the entry point for our client-side logic
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import 'core/polyfills'
import 'core/console'
import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import sourceMaps from 'source-map-support'
sourceMaps.install()

import router from './helpers/router'
import actions from './actions'
import autorun from './autorun'
//import App from './components/App'

// We render our react app into this element
const container = document.getElementById('container')

// Initialize actions and state
const stores = actions(window.__STATE)

// React to changes
autorun(stores)

// Render HTML on the browser
//fetchData(renderProps, {}, stores).then(() => {
ReactDOM.render(<AppContainer>
    {router(stores)}
</AppContainer>, container)
//})

// Hot-reloading
if (module.hot) {
    module.hot.accept()
    /*module.hot.accept('./helpers/router', () => {
        const nextRouter = require('./helpers/router')
        ReactDOM.render(<AppContainer>
            {nextRouter(stores)}
        </AppContainer>, container)
    })*/
}
