import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/formats/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/formats/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/formats/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/formats/', data, (result) => callback(result))
  },
  delete(data, callback) {
    Cruds.delete('/formats/', data, (result) => callback(result))
  },
}
