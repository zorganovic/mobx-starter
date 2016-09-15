import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'

class App extends React.Component {
    render() {
        const { context, history, routes } = this.props
        return (
            <Provider {...context}>
                <Router history={browserHistory}>
                    {routes(context)}
                </Router>
            </Provider>
        )
    }
}

export default App
