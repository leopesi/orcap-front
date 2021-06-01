import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/payments/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/payments/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/payments/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/payments/', data, (result) => callback(result))
	},
}
