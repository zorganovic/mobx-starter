import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App/App'

/**
 * Asynchronously load a file
 * @param main {String} - Main component
 * @returns {Function}
 */
function requireAsync(main) {
    return function(location, next) {
        next(null, require('./containers/' + main))
    }
}

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
function createRoutes({ state }) {

    return <Route component={App}>

        <Route path="/">
            <IndexRoute getComponent={requireAsync('Home')}/>
            <Route path="about" getComponent={requireAsync('About')}/>
        </Route>

        <Route path="*" getComponent={requireAsync('NotFound')}/>
    </Route>
}

export default  createRoutes
