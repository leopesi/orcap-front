import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/clients/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/clients/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/clients/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/clients/', data, (result) => callback(result))
	},
}
