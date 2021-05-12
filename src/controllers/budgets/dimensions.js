import axios from 'axios'

export default {

	calculate(data, callback) {
		
		axios.post('/dimensions', data)
		.then(response => {
			if (response && response.data) {
				console.log(response.data)
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

}