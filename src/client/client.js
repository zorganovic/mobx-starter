// Enable source-maps
import sourceMaps from 'source-map-support'
sourceMaps.install()

// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
import '../shared/polyfills'
import '../shared/console'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Router, RouterContext, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'
import routes from './routes'
import { createClientState } from './state'
import actions from './actions'

// Import our styles
require('../assets/css/index.scss')

// Initialize stores & inject server-side state into front-end
const state = createClientState()
const context = {
    state,
    actions: actions(state)
}

function createElement(props) {
    return <Provider router={browserHistory} {...context}>
        <RouterContext {...props} />
    </Provider>
}

function renderApp() {
    render(<Router
        history={browserHistory}
        render={createElement}
        routes={routes(context)}
    />,
    document.getElementById('container'))
}

// Render HTML on the browser
renderApp()

// Use hot-reloading if available
if (module.hot) {
    module.hot.accept(() => renderApp())
}
