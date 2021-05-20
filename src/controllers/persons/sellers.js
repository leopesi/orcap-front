import axios from 'axios'

export default {

	sellers(callback) {
		axios.get('/sellers')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getSeller(id, callback) {
		axios.get('/sellers/' + id)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	insertSeller(data, callback) {
		axios.post('/sellers/', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	updateSeller(data, callback) {
		axios.put('/sellers/' + data.id, data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	}

}