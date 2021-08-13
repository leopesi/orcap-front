import axios from 'axios'
import Cruds from '../defaults/cruds'

export default {
  budgets(callback) {
    axios.get('/budgets').then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  getBudget(id, callback) {
    axios.get('/budgets/' + id).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  insertBudget(data, callback) {
    axios.post('/budgets/', data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  updateBudget(data, callback) {
    axios.put('/budgets/' + data.id, data).then((response) => {
      if (response && response.data) {
        callback(response.data)
      } else {
        callback({})
      }
    })
  },

  delete(data, callback) {
    Cruds.delete('/sellers/', data, (result) => callback(result))
  },
}
