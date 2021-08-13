import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/profiles/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/profiles/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/profiles/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/profiles/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/profiles/', data, (result) => callback(result))
  },
}
