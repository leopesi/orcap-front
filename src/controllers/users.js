import axios from 'axios'

export default {

	users(callback) {
		axios.get('/users')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getUser(id, callback) {
		axios.get('/users/' + id)
		.then(response => {
			console.log(response)
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	}

}