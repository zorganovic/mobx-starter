import '../shared/bootstrap'
import '../shared/polyfills'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Router, RouterContext, browserHistory } from 'react-router'
import { extendObservable } from 'mobx'
import Context from './components/App/Context'
import routes from './routes'
import state from './state'
import actions from './actions'

// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
if (global.isClient) {

    // Import our styles
    require('../assets/css/index.scss')

    // For Electron
    window.__STATE = extendObservable(state, window.__STATE)

    // Initialize stores & inject server-side state into front-end
    const context = {
        state: window.__STATE,
        store: actions(window.__STATE)
    }

    function createElement(props) {
        return <Context context={context}>
            <RouterContext {...props} />
        </Context>
    }

    // Render HTML on the browser
    render(<Router history={browserHistory}
                   render={createElement}
                   routes={routes(context)}/>,
    document.getElementById('container'))
}

// if (module.hot) module.hot.accept();
