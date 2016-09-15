import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
//import { match, RouterContext, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'
import { ServerRouter } from 'react-router'
import createServerRenderContext from 'react-router/createServerRenderContext'
import fetchData from '../../shared/fetchData';
import Html from '../../client/components/Common/Html'
import App from '../../client/components/App'

/**
 * Server-side render
 * @param req
 * @param res
 */
function render(req, res) {

    function sendResponse(statusCode, content) {
        res.status(statusCode).send('<!DOCTYPE html>\n' + renderToStaticMarkup(content))
    }

    const renderContext = createServerRenderContext()

    function renderComponent() {
        return (
            <Provider history={() => {}} {...(req.context)}>
                <Html>
                    <ServerRouter location={req.originalUrl} context={renderContext}>
                        <App/>
                    </ServerRouter>
                </Html>
            </Provider>
        )
    }

    const result = renderContext.getResult()

    // Handle redirects
    if (result.redirect) {
        res.writeHead(301, { Location: result.redirect.pathname })
        return res.end()
    }

    // 404 Route not found !
    if (result.missed) {
        return sendResponse(404, renderComponent())
    }

    sendResponse(200, renderComponent())
    /*match(matchRoutes, function(error, redirectLocation, renderProps) {

        if (error) return res.status(500).send(error.message)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return res.status(404).send('Not found')

        fetchData(renderProps, req.context).then(() => {
            sendResponse(200, ReactDOMServer.renderToStaticMarkup(renderComponent(renderProps)))
        }).catch(error => {
            sendResponse(404, error)
        })
    })*/
}

export default render
