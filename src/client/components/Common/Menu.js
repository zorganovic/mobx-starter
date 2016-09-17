import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'

@observer(['actions'])
class Menu extends React.Component {
    render() {
        const { actions } = this.props
        return <div>
            {actions.account.isLoggedIn()
                ? <LoggedInMenu/>
                : <LoggedOutMenu/>
            }
        </div>
    }
}

function LoggedInMenu() {
    return <menu>
        <Link activeClassName="selected" to="/">Browse</Link>
        <Link activeClassName="selected" to="/about">About</Link>
        <Link activeClassName="selected" to="/logout">Logout</Link>
    </menu>
}

function LoggedOutMenu() {
    return <menu>
        <Link activeClassName="selected" to="/">Browse</Link>
        <Link activeClassName="selected" to="/about">About</Link>
        <Link activeClassName="selected" to="/register">Register</Link>
        <Link activeClassName="selected" to="/login">Login</Link>
    </menu>
}

export default Menu
