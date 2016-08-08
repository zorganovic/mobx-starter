import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import fetchData from '../../shared/fetchData';
import Context from '../../client/components/Common/Context'
import Html from '../../client/components/Common/Html'
import routes from '../../client/routes'

/**
 * Server-side render
 * @param req
 * @param res
 */
export default async function render(req, res) {

    // Create routing
    const matchRoutes = {
        routes: routes(req.context),
        location: req.originalUrl
    }

    function sendResponse(statusCode, content) {
        res.status(statusCode).send('<!DOCTYPE html>\n' + content)
    }

    function renderComponent(renderProps) {
        return (
            <Context context={req.context}>
                <Html>
                    <RouterContext {...renderProps}/>
                </Html>
            </Context>
        )
    }

    match(matchRoutes, function(error, redirectLocation, renderProps) {

        if (error) return res.status(500).send(error.message)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return res.status(404).send('Not found')

        fetchData(renderProps, req.context).then(() => {
            sendResponse(200, ReactDOMServer.renderToStaticMarkup(renderComponent(renderProps)))
        }).catch(error => {
            sendResponse(404, error)
        })
    })
}
