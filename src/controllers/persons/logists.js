import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/logists/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/logists/', id, (result) => callback(result))
	},

	getByToken(callback) {
		Cruds.get('/logists-by-token/', null, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/logists/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/logists/', data, (result) => callback(result))
	},
}
