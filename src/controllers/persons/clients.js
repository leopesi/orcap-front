import axios from 'axios'

export default {

	clients(callback) {
		axios.get('/clients')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getClient(id, callback) {
		axios.get('/clients/' + id)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	insertClient(data, callback) {
		axios.post('/clients/', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	updateClient(data, callback) {
		axios.put('/clients/' + data.id, data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	}

}