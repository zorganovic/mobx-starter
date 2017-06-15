import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { useStaticRendering } from 'mobx-react'
import preload from '../../src/client/preload'
import Html from '../../src/components/common/Html'

useStaticRendering(true)

// Server-side render
export default async(ctx, next) => {

  const context = {}

  //await preload(ctx.stores, ctx.url)

  const html = <StaticRouter location={ctx.url} context={context}>
    <Html stores={ctx.stores}/>
  </StaticRouter>

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    ctx.redirect(context.url)
    ctx.body = '<!DOCTYPE html>redirecting'
    return await next()
  }

  ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(html)
}
