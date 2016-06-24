import db from './database'

async function seedData() {
    const count = await db.todos.count({})
    if (!count) {
        console.log('Did not find todos. Adding your very first todo!')
        const todo = new db.todos({
            text: 'Something todo ja?'
        })
        await todo.save()
    }
}

export default seedData
