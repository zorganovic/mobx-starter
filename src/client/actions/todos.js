//import { size, get } from 'lodash/fp'

export default (state, store) => {

    /**
     * @name todos
     * @class todos
     */
    return class todos {

        add() {
            // Add to list
            state.todos.items.push({
                text: state.forms.addtodo.text
            })
            // Clear input box
            state.forms.addtodo.text = ''
            //return this.fetch(`api/todos/add`)
        }

        delete() {
            return this.fetch(`api/todos/delete`)
        }

        browse() {
            return this.fetch(`api/todos`)
        }
    }
}
