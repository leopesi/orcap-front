import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/lids/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/lids/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/lids/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/lids/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/lids/', data, (result) => callback(result))
  },
}
