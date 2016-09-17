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
import { BrowserRouter } from 'react-router'
import App from './components/App'
import { createClientState } from './state'
import createActions from './actions'

// Enable source-maps
sourceMaps.install()

// Initialize stores & inject server-side state into front-end
const state = createClientState()
const actions = createActions(state)

// We render our react app into this element
const container = document.getElementById('container')

function renderApp(RootComponent) {
    render(<AppContainer>
        <BrowserRouter>
            {(props) => {
                return <RootComponent
                state={state}
                actions={actions}
                history={props.router}
                />
            }}
        </BrowserRouter>
    </AppContainer>, container)
}

// Render HTML on the browser
renderApp(App)

if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp(require('./components/App'), container)
    })
}
