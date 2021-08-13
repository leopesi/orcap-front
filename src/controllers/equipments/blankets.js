import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/blankets/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/blankets/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/blankets/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/blankets/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/blankets/', data, (result) => callback(result))
  },
}
