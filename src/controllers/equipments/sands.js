import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/sands/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/sands/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/sands/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/sands/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/sands/', data, (result) => callback(result))
  },
}
