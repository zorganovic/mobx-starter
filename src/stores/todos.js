import request from 'core/request'
import { extendObservable } from 'mobx'

/**
 * @class Todos
 */
export default class Todos {

  constructor(state = {}) {
    extendObservable(this, {
      loading: false,
      show_modal: false,
      month: 6,
      year: 2016,
      items: [],
      selectedDays: []
    }, state)
  }

  map(predicate) {
    return this.items.map(predicate)
  }

  add(text) {
    return request.post(`/api/todos/add`, { text })
      .then(result => {
        // Add to list
        this.items.push({
          _id: result._id,
          text: result.text
        })
      })
  }

  async remove(item) {
    try {
      console.warn('Removing', item._id)
      await request.post(`/api/todos/remove`, { _id: item._id })
      this.items.remove(item)
    } catch(err) {
      console.error(err)
    }
  }

  async browse() {
    this.items = await request.get(`/api/todos`)
  }
}
