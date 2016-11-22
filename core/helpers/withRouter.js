import React, { PropTypes } from 'react'
import { Match, Miss } from 'react-router'
import Broadcasts from 'react-router/Broadcasts'

export default (WrappedComponent) => {
    class WithRouter extends React.Component {
        static contextTypes = {
            history(){},
            router(){}
        }

        render() {

            return (
            <LocationSubscriber>
                {(locationContext) => {
                    const history = { ...this.context.history }
                    delete history.location
                    return (
                    <WrappedComponent
                    {...this.props}
                    location={locationContext}
                    history={history}
                    router={this.context.router}
                    />
                    )
                }}
            </LocationSubscriber>
            )
        }
    }
    return WithRouter
}
