import { remove } from 'lodash/fp'

export default (state, store) => {

    /**
     * @name todos
     * @class todos
     */
    return class todos {

        add() {
            // Add to list
            state.todos.items.push({
                _id: Date.now(),
                text: state.forms.addtodo.text
            })
            // Clear input box
            state.forms.addtodo.text = ''
            //return this.fetch(`api/todos/add`)
        }

        remove(item) {
            console.warn('Removing', item._id)
            return this.post(`api/todos/remove`, { item }).then(() => {
                state.todos.items.remove(item)
            })
        }

        browse() {
            return this.get(`api/todos`)
        }
    }
}
