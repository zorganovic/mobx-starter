import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'

/**
 * Asynchronously load a file
 * @param main {String} - Main component
 * @returns {Function}
 */
function requireAsync(main) {
    return function(location, next) {
        next(null, require('./components/' + main))
    }
}

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
function createRoutes({ state }) {

    function requireLogin(nextState, replaceState, next) {
        //if (!state.user._id) replaceState(null, '/user/login')
        next()
    }

    return <Route component={App}>

        <Route path="/">
            <IndexRoute getComponent={requireAsync('Home')}/>
            <Route path="about" getComponent={requireAsync('About')}/>

            {/* User management */}
            <Route path="login" getComponents={requireAsync('Account/Login')}/>
            <Route path="logout" getComponents={requireAsync('Account/Logout')} onEnter={requireLogin}/>
            <Route path="register" getComponents={requireAsync('Account/Register')}/>
        </Route>

        <Route path="*" getComponent={requireAsync('NotFound')}/>
    </Route>
}

export default createRoutes
