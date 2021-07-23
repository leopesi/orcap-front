import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/vinyls/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/vinyls/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/vinyls/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/vinyls/', data, (result) => callback(result))
	},
}
