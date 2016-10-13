import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import fetchData from 'core/helpers/fetchData';
import Html from '../../client/components/Common/Html'
import routes from '../../client/routes'

// Server-side render
export default async(ctx, next) => {

    // Create routing
    const matchRoutes = {
        routes: routes(ctx.stores),
        location: ctx.url
    }

    function sendResponse(statusCode, output) {
        ctx.body = '<!DOCTYPE html>\n' + output
        next()
    }

    function renderComponent(renderProps) {
        try {
            return renderToStaticMarkup(<Html stores={ctx.stores}>
                <RouterContext {...renderProps}/>
            </Html>)
        } catch (error) {
            console.error(error)
        }
    }

    match(matchRoutes, async(error, redirectLocation, renderProps) => {

        if (error) return sendResponse(500, error.message)
        if (redirectLocation) return ctx.redirect(redirectLocation.pathname + redirectLocation.handleInput)
        if (!renderProps) return sendResponse(404, 'RenderProps not found')

        fetchData(renderProps.components, renderProps.params, ctx.stores).then(() => {
            sendResponse(200, renderComponent(renderProps))
        }).catch(error => {
            sendResponse(404, error)
        })
    })
}
