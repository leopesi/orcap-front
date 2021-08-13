import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/providers/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/providers/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/providers/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/providers/', data, (result) => callback(result))
  },
  delete(data, callback) {
    Cruds.delete('/providers/', data, (result) => callback(result))
  },
}
