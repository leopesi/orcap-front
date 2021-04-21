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
	}

}