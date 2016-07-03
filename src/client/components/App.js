import React from 'react'
import { connect } from 'mobx-connect'
import { IndexLink, Link } from 'react-router'
import Menu from './Common/Menu'

const App = connect(function() {
    const { account } = this.context.state
    return <div>
        {account ? <LoggedInMenu/> : <LoggedOutMenu/>}
        {this.props.children}
    </div>
})

function LoggedInMenu() {
    return <Menu>
        <IndexLink to="/">Browse</IndexLink>
        <Link to="/about">About</Link>
        <Link to="/logout">Logout</Link>
    </Menu>
}

function LoggedOutMenu() {
    return <Menu>
        <IndexLink to="/">Browse</IndexLink>
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </Menu>
}

export default App
