import React from 'react'
import { Match, Miss } from 'react-router'
import { Provider } from 'mobx-react'
import Home from './Home'
import About from './About'
import Login from './Account/Login'
import Logout from './Account/Logout'
import Register from './Account/Register'
import NotFound from './NotFound'
import Menu from './Common/Menu'

/**
 * Idea: Execute just the matches, wrap component prop with fetchData
 * that will add promises to an array and then return the array to server
 *
 * Execute promises and render again for real
 *
 * @param component
 * @param rest
 * @returns {XML}
 * @constructor
 */
const MatchWithFade = (props) => {
    const { component, ...rest } = props
    return <Match {...rest} render={(matchProps) => {
        console.warn(matchProps)
        return <component {...matchProps}/>
    }}/>
}

class App extends React.Component {
    render() {
        const { stores } = this.props

        // Wrapping with provider gives children access to stores
        return <Provider {...stores}>
            <div>
                <Menu/>

                <Match exactly pattern="/" component={Home}/>
                <Match exactly pattern="/about" component={About}/>

                {/* User management */}
                <Match exactly pattern="/login" component={Login}/>
                <Match exactly pattern="/logout" component={Logout}/>
                <Match exactly pattern="/register" component={Register}/>

                <Miss component={NotFound}/>
            </div>
        </Provider>
    }
}

export default App
