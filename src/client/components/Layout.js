import React from 'react'
import { observer } from 'mobx-react'
import { IndexLink, Link } from 'react-router'
import { Provider } from 'mobx-react'
import Menu from './Common/Menu'

@observer(['state','actions'])
class Layout extends React.Component {
    render() {
        const { account } = this.props.actions
        return <div>
            {account.isLoggedIn() ? <LoggedInMenu/> : <LoggedOutMenu/>}
            {this.props.children}
        </div>
    }
}

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

export default Layout
