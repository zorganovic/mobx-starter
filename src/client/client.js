// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
import '../shared/polyfills'
import '../shared/console'
import '../assets/css/index.scss'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createClientState } from './state'
import actions from './actions'
import App from './components/Common/App'

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
    module.hot.accept('./components/Common/App', () => {
        const NextApp = require('./components/Common/App')
        render(<AppContainer>
            <NextApp context={context}/>
        </AppContainer>, container)
    })
}
