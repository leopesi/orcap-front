import axios from 'axios'

export default {
	login(mail, password, callback) {
		axios
			.get('/login?mail=' + mail + '&password=' + password)
			.then((response) => {
				if (response && response.data && response.data.token) {
					localStorage.token = response.data.token
					localStorage.userType = response.data.type
					axios.defaults.headers.common['Authorization'] =
						'Bearer ' + response.data.token
					callback(true)
				} else {
					callback(false)
				}
			})
	},

	sessions(callback) {
		axios.get('/sessions')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getSession(id, callback) {
		axios.get('/sessions/' + id)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	insertSession(data, callback) {
		axios.post('/sessions/', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	updateSession(data, callback) {
		axios.put('/sessions/' + data.id, data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	}
}
