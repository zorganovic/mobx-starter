import logger from 'debug'
import { checkAuthorized } from '../routes/account'

/**
 * Middleware for checking if we're logged in
 * @param ctx
 * @param next
 */
export default async function(ctx, next) {
    try {
        const auth = await checkAuthorized(ctx.token)
        logger('binder:authorized')(auth.token.substring(125))
        ctx.authorized = true
        await next()
    } catch(error) {
        logger('binder:forbidden')(error)
        if (ctx.headers['user-agent'].includes('node-fetch')) {
            ctx.authorized = false
            ctx.token = null
            await next()
        } else {
            //ctx.redirect('/page/login')
            //ctx.cookies.set('token', null)
            ctx.status = 401
        }
    }
}
/*export default async(ctx, next) => {
    const auth = await checkAuthorized(ctx.token)
    if (auth) {
        ctx.authorized = true
    } else {
        ctx.authorized = false
        ctx.body = { error: 'Not authorized' }
    }
    logger('app:authorized')(ctx.authorized)
    await next()

    // try {
    //     const auth = await checkAuthorized(ctx.token)
    //     logger('app:authorized')(auth.token.substring(125))
    //     ctx.authorized = true
    //     await next()
    // } catch(error) {
    //     if (ctx.headers['user-agent'].includes('node-fetch')) {
    //         ctx.authorized = false
    //         ctx.token = null
    //         ctx.body = error
    //         logger('app:authorize:forbidden0')(error)
    //         ctx.throw(400, error.toString())
    //         //await next()
    //     } else {
    //         //ctx.redirect('/page/login')
    //         //ctx.cookies.set('token', null)
    //         // ctx.status = 401
    //         ctx.body = error
    //         logger('app:authorize:forbidden1')(error)
    //         ctx.throw(400, error.toString())
    //         //await next()
    //     }
    // }
}*/
