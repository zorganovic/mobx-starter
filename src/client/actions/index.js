import request from '../helpers/request'
import todos from './todos'
import account from './account'

// All our actions are listed here
const actions = {
    todos,
    account
}

export default function(state) {

    const namespaces = Object.keys(actions)
    const classes = {}

    for (var i in namespaces) {
        const namespace = namespaces[i]
        const classObj = actions[namespace](state, classes);
        classes[namespace] = new classObj()
        classes[namespace].request = request(state)
    }

    return classes
}
