// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
import sourceMaps from 'source-map-support'
import '../shared/polyfills'
import '../shared/console'
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import { createClientState } from './state'
import actions from './actions'

// Enable source-maps
sourceMaps.install()

// Initialize stores & inject server-side state into front-end
const state = createClientState()
const context = {
    state,
    actions: actions(state)
}
// We render our react app into this element
const container = document.getElementById('container')

function renderApp() {
    render(<AppContainer>
        <App context={context}/>
    </AppContainer>, container)
}

// Render HTML on the browser
renderApp()

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App')
        render(<AppContainer>
            <NextApp context={context}/>
        </AppContainer>, container)
    })
}
