import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Common/Layout'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Account/Login'
import Logout from './components/Account/Logout'
import Register from './components/Account/Register'
import NotFound from './components/NotFound'

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}


 */
const router = (stores) => {

    function requireLogin(nextState, replaceState, next) {
        //if (!state.user._id) replaceState(null, '/user/login')
        next()
    }

    return <Route component={Layout}>
        <Route path="/">
            <IndexRoute component={Home}/>
            <Route path="about" component={About}/>

            {/* User management */}
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout} onEnter={requireLogin}/>
            <Route path="register" component={Register}/>
        </Route>

        <Route path="*" component={NotFound}/>
    </Route>
}

export default router

