import _ from 'lodash'
import { Router } from 'express'
import error from '../helpers/error'
import db from '../helpers/database'
const router = Router();

router.get('/api/account/user', async(req, res) => {
    const { session } = req
    if (!session.id) return true

    let user = await db.account.findOne({ session: session.id })

    // no errors since we also want anonymous users
    res.json({
        _id: generateUserId(session),
        username: generateUsername(session),
        contacts: [],
        picture: null
    })
})

router.post('/api/account/login', async(req, res) => {
    const { session, body:{ username, password } } = req
    const user = await db.account.findOneAndUpdate(
    { username, password },
    { session: session.id },
    { new: true })

    if (!user) return error(res, 'Wrong credentials')
    res.json(user.toJSON())
})

router.get('/api/account/logout', async(req, res) => {
    const { session } = req
    const user = await db.account.findOneAndUpdate({ session: session.id }, { session: null }).lean() // clear in db
    session.destroy() // clear session
    res.json(user)
})

router.post('/api/account/register', async(req, res) => {
    const exists = await db.account.count({ username: req.body.username })
    if (exists) return error(res, 'Username already taken')

    const user = new db.account({
        username: req.body.username,
        password: req.body.password
    })
    await user.save()
    res.json(user.toJSON())
})

router.post('/api/account/update', async(req, res) => {
    const { session, body, file } = req.body
    const query = {}
    const userExists = await db.account.findOne({ username: body.username }, '_id').lean()
    if (userExists) return error(res, 'Username already taken')

    if (body.username) {
        query['username'] = body.username
    }
    if (body.description) {
        query['description'] = body.description
    }

    const user = await db.account.findOneAndUpdate({ session: session.id }, { $set: query }, { new: true }).lean()

    res.json({
        username: user.username,
        description: user.description,
        picture: user.picture
    })
})

export default router
