import React from 'react'
import { Router, RouterContext, browserHistory } from 'react-router'
import App from '../components/App'
import routes from '../routes'

// https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211504531
Router.prototype.componentWillReceiveProps = function(nextProps) {
    let components = []
    function grabComponents(element) {
        // This only works for JSX routes, adjust accordingly for plain JS config
        if (element.props && element.props.component) {
            components.push(element.props.component)
        }
        if (element.props && element.props.children) {
            React.Children.forEach(element.props.children, grabComponents)
        }
    }
    grabComponents(nextProps.routes || nextProps.children)
    components.forEach(React.createElement) // force patching
}

const router = (stores) => {

    function createElement(props) {
        return <App stores={stores}>
            <RouterContext {...props} />
        </App>
    }

    return <App stores={stores}>
        <Router
        history={browserHistory}
        routes={routes(stores)}
        />
    </App>
    /*return <Router
        history={browserHistory}
        render={createElement}
        routes={routes(stores)}
    />*/
}
