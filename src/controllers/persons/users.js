import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/users/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/users/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/users/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/users/', data, (result) => callback(result))
	},
}
