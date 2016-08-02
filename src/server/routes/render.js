import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { getAccount } from '../actions/account';
import fetchData from '../helpers/fetchData';
import Context from '../../client/components/Common/Context'
import Html from '../../client/components/Common/Html'
import state from '../../client/state'
import routes from '../../client/routes'
import actions from '../../client/actions'

export default async function render(req, res) {

    state.app.hostname = req.headers.host

    const context = {
        state: state,
        store: actions(state)
    }

    // Add state & session data
    context.state.account = await getAccount(req.session)

    // Create routing
    let matchRoutes = {
        routes: routes(context),
        location: req.originalUrl
    }

    match(matchRoutes, function(error, redirectLocation, renderProps) {

        if (error) return res.status(500).send(error.message)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return res.status(404).send('Not found')

        fetchData(renderProps, context.state, context.store).then(() => {

            const content = ReactDOMServer.renderToStaticMarkup(
            <Context context={context}>
                <Html>
                    <RouterContext {...renderProps}/>
                </Html>
            </Context>)

            return res.status(200).send('<!DOCTYPE html>\n' + content)
        })
    })
}
