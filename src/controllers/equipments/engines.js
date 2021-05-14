import axios from 'axios'

export default {

	getEnginesByDimension(data, callback) {
		axios.post('/engines-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	engines(callback) {
		axios.get('/engines')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getEngine(id, callback) {
		axios.get('/engines/' + id)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	insertEngine(data, callback) {
		axios.post('/engines/', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	updateEngine(data, callback) {
		axios.put('/engines/' + data.id, data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	}

}