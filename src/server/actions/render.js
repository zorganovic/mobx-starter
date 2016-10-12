import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerRouter } from 'react-router'
import createServerRenderContext from 'react-router/createServerRenderContext'
import fetchData from 'core/helpers/fetchData';
import Html from '../../client/components/Common/Html'

// Server-side render
export default async(ctx, next) => {

    const renderContext = createServerRenderContext()

    function renderComponent() {
        return new Promise((resolve) => {
            let markup = <ServerRouter location={ctx.originalUrl} context={renderContext}>
                <Html stores={ctx.stores} dataPromise={resolve}/>
            </ServerRouter>

            console.warn('renderComponent()')
            renderToStaticMarkup(markup)
        })
    }

    function sendResponse(statusCode, output) {
        //fetchData(component, ctx.params, ctx.stores).then(async() => {
        //ctx.status = statusCode
        ctx.body = '<!DOCTYPE html>\n' + output
        //})
    }

    const result = renderContext.getResult()

    // Handle redirects
    if (result.redirect) {
        //res.writeHead(301, { Location: result.redirect.pathname })
        // ctx.set('Location', result.redirect.pathname)
        ctx.status = 301
        // ctx.redirect(result.redirect.pathname)
        ctx.body = '<!DOCTYPE html>\n' + 'redirecting'
        return await next()
    }

    // 404 Route not found !
    if (result.missed) {
        renderComponent().then(markup => {
            sendResponse(404, markup)
        })
    } else {
        let markup = <ServerRouter location={ctx.originalUrl} context={renderContext}>
            <Html stores={ctx.stores}/>
        </ServerRouter>
        ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(markup)

        /*renderComponent().then(markup => {
            console.log('stores', markup.todos.items)
            console.log('sendResponse', ctx.stores.todos.items)
            sendResponse(200, renderToStaticMarkup(markup))
        })*/
    }

    // match(matchRoutes, function(error, redirectLocation, renderProps) {
    //
    //     if (error) return res.status(500).send(error.message)
    //     if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.handleInput)
    //     if (!renderProps) return res.status(404).send('Not found')
    //
    //     fetchData(renderProps, req.context).then(() => {
    //         sendResponse(200, ReactDOMServer.renderToStaticMarkup(renderComponent(renderProps)))
    //     }).catch(error => {
    //         sendResponse(404, error)
    //     })
    // })


}
