import _ from 'lodash'
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

/*
const MatchWithFade = ({ component, ...rest }) => {
    function renderComponent(matchProps) {
        console.warn(matchProps)
        return <component {...matchProps}/>
    }
    return <Match {...rest} render={renderComponent}/>
}*/

class App extends React.Component {
    componentWillMount() {
        this.hello = 'hi'
        if (this.props.dataPromise) {
            //console.log('componentWillMount: ', this.props.dataPromise())
        }
        console.log('this.props: ', this.props.stores.todos.items)
        /*fetchData(this.props.children, this.props.params, this.props.stores).then(async(resp) => {
            console.log('xx+++++----', resp)
        })*/
    }

    render() {
        const { stores, dataPromise = _.noop } = this.props

        // Wrapping with provider gives children access to stores
        function Provide(content) {
            return <Provider {...stores}>
                {content}
            </Provider>
        }

        const MatchWithFade = (props) => {
            const { component: MatchComponent, ...rest } = props
            return <Match {...rest} render={function(matchProps) {
                //console.warn(matchProps, props, MatchComponent.fetchData, rest)
                console.info('***************', MatchComponent.constructor)

                /*const promise = new Promise((resolve) => {

                })*/
                /*if (MatchComponent.fetchData) {
                    MatchComponent.fetchData(stores, matchProps.params)
                }*/
                return <MatchComponent {...matchProps}/>
            }}/>
        }

        const fetchData = (MatchedComponent) => {
            return ({ params }) => {
                /*if (MatchedComponent.fetchData) {
                    MatchedComponent.fetchData(stores, params).then(() => {
                        console.log('FEEETCHHHEED: ', dataPromise())
                    })
                }*/
                console.debug(MatchedComponent.fetchData)

                // Server-side call
                //if (this.updater.transaction && this.updater.transaction.renderToStaticMarkup) {
                    Home.fetchData(stores).then(() => {
                        dataPromise(stores)
                        console.debug('Home.fetchData', stores.todos.items)
                    })
                //}
                return <MatchedComponent/>
            }
        }

        console.debug('App.render')
        return Provide(
            <div>
                test {this.hello}
                <Menu/>

                <Match exactly pattern="/" render={fetchData(Home)}/>
                <MatchWithFade exactly pattern="/about" component={About}/>

                {/* User management */}
                <MatchWithFade exactly pattern="/login" component={Login}/>
                <MatchWithFade exactly pattern="/logout" component={Logout}/>
                <MatchWithFade exactly pattern="/register" component={Register}/>

                <Miss component={NotFound}/>
            </div>
        )
    }
}

// Hot-reloading
/*if (module.hot) {
    module.hot.accept()
}*/

export default App
