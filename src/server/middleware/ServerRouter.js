import React, { PropTypes } from 'react'
import StaticRouter from 'react-router/StaticRouter'

// ServerRouter.js from react-router with a bugfix for v4.0.0-2
// We should revert to using the original one once the bug is fixed
class ServerRouter extends React.Component {

    static propTypes = {
        context: PropTypes.object.isRequired,
        location: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.node
        ])
    }

    static childContextTypes = {
        serverRouter: PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            serverRouter: this.props.context
        }
    }

    render() {
        const { context, location } = this.props
        const redirect = (location) => {
            context.setRedirect(location)
        }
        return <StaticRouter
            action="POP"
            location={location}
            onReplace={redirect}
            onPush={redirect}
            {...this.props}
        />
    }
}

export default ServerRouter
