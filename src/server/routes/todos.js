import _ from 'lodash'
import { Router } from 'express'
import db from '../helpers/database'
const router = Router();

router.get('/api/todos', async(req, res) => {
    const body = await db.todos.find({}).limit(100).exec()
    res.json(body)
})

router.get('/api/todos/search', async(req, res) => {

    if (_.isEmpty(req.query.text)) return res.status(404).send('[text] not provided')

    const nameQuery = req.query.text
                         .cleanString()
                         .split(' ')
                         .map(part => ({ title: new RegExp(part, 'i') }))


    console.log('Searching for movie:', nameQuery)
    const body = await db.todos
                         .find({ $and: nameQuery })
                         .sort({ text: 1 })
                         .limit(10)
                         .exec()
    res.json(body)
})

router.get('/api/todos/:id', async(req, res) => {

    if (_.isEmpty(req.params.id)) return res.status(404).send('[id] not provided')

    // Send output without waiting for the update
    const result = await db.todos.findOne({ _id: req.params.id })

    return res.json(result)
})


/**
 * Remove weird characters and trim space
 * @private
 * @param str
 * @returns {string}
 */
function cleanString(str) {
    return str.toLowerCase()
              .replace(/\W+|–/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
}

export default router
