import Cruds from '../defaults/cruds'

export default {
  list(callback) {
    Cruds.list('/engines/', (result) => callback(result))
  },

  get(id, callback) {
    Cruds.get('/engines/', id, (result) => callback(result))
  },

  insert(data, callback) {
    Cruds.insert('/engines/', data, (result) => callback(result))
  },

  update(data, callback) {
    Cruds.update('/engines/', data, (result) => callback(result))
  },

  delete(data, callback) {
    Cruds.delete('/engines/', data, (result) => callback(result))
  },
}
