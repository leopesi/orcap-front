import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/brands/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/brands/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/brands/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/brands/', data, (result) => callback(result))
	},
}
