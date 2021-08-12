import axios from 'axios'
import Cruds from '../defaults/cruds'

export default {
  login(mail, password, callback) {
    axios
      .get('/login?mail=' + mail + '&password=' + password)
      .then((response) => {
        if (response && response.data && response.data.token) {
          localStorage.token = response.data.token
          localStorage.userType = response.data.type
          localStorage.userName = response.data.name
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.token
          callback(true)
        } else {
          callback(false)
        }
      })
  },

  list(callback) {
    Cruds.list('/sessions/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/sessions/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/sessions/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/sessions/', data, (result) => callback(result))
  },
  delete(data, callback) {
    Cruds.delete('/users/', data, (result) => callback(result))
  },
}
