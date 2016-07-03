import { remove } from 'lodash/fp'

export default (state, store) => {
    /**
     * @name todos
     * @class todos
     */
    return class todos {

        add() {
            return this.request(`api/todos/add`, { text: state.forms.addtodo.text }).then(result => {
                // Add to list
                state.todos.items.push({
                    _id: result._id,
                    text: result.text
                })
                // Clear input box
                state.forms.addtodo.text = ''
            })
        }

        remove(item) {
            console.warn('Removing', item._id)
            return this.request(`api/todos/remove`, { _id: item._id }).then(() => {
                state.todos.items.remove(item)
            })
        }

        browse() {
            return this.request(`api/todos`)
        }
    }
}
