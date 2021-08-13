import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/filters/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/filters/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/filters/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/filters/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/filters/', data, (result) => callback(result))
  },
}
