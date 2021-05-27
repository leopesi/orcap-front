import Cruds from '../defaults/cruds'

export default {
	list(callback) {
		Cruds.list('/sellers1/', (result) => callback(result))
	},

	get(id, callback) {
		Cruds.get('/sellers/', id, (result) => callback(result))
	},

	insert(data, callback) {
		Cruds.insert('/sellers/', data, (result) => callback(result))
	},

	update(data, callback) {
		Cruds.update('/sellers/', data, (result) => callback(result))
	},
}
