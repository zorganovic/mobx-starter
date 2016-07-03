import db from './database'

export async function getAccount(session) {

    console.info('SESSION:', session.id)
    if (!session.id) return true
    let account = await db.account.findOne({ session: session.id })
    if (!account) return null
    return account.toJSON()
}
