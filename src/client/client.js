import '../shared/bootstrap'
import '../shared/polyfills'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Router, RouterContext, browserHistory } from 'react-router'
import Context from './components/Common/Context'
import routes from './routes'
import createState from './state'
import actions from './actions'

// This is the entry point for our client-side logic
// The server-side has a similar configuration in `src/server/routes/render.js`
if (process.env.BROWSER) {

    // Import our styles
    require('../assets/css/index.scss')

    // Initialize stores & inject server-side state into front-end
    const state = createState(window.__STATE)
    const context = {
        state,
        store: actions(state)
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

if (module.hot) module.hot.accept()
