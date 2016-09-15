import React from 'react'
//import { Router, browserHistory } from 'react-router'
import { Router, Match, Miss, Link } from 'react-router'
import { Provider, observer } from 'mobx-react'
import Home from './Home'
import About from './About'
import Login from './Account/Login'
import Logout from './Account/Logout'
import Register from './Account/Register'
import NotFound from './NotFound'

@observer(['state', 'actions', 'history'])
class App extends React.Component {
    render() {
        const { context, history, actions } = this.props
        return (
            <Provider {...context}>
                {actions.account.isLoggedIn()
                    ? <LoggedInMenu/>
                    : <LoggedOutMenu/>
                }

                <Match exactly pattern="/" component={Home} />
                <Match pattern="/about" component={About}/>

                {/* User management */}
                <Match pattern="/login" component={Login}/>
                <Match pattern="/logout" component={Logout}/>
                <Match pattern="/register" component={Register}/>

                <Miss component={NotFound}/>
            </Provider>
        )
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

export default App
