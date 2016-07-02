import React from 'react'
import { connect } from 'mobx-connect'
import { IndexLink, Link } from 'react-router'
import Menu from './Common/Menu'

@connect
class App extends React.Component {

    render() {
        const { account } = this.context.state
        return <div>
            {account ? <LoggedInMenu/> : <LoggedOutMenu/>}
            {this.props.children}
        </div>
    }
}

function LoggedInMenu() {
    return <Menu>
        <IndexLink to="/">Browse</IndexLink>
        <Link to="/logout">Logout</Link>
        <Link to="/about">About</Link>
    </Menu>
}

function LoggedOutMenu() {
    return <Menu>
        <IndexLink to="/">Browse</IndexLink>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
    </Menu>
}

export default App
