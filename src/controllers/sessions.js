import axios from 'axios'

export default {

	login(mail, password, callback) {
		axios.get('/login?mail='+mail+'&password='+password)
		.then(response => {
			if (response && response.data && response.data.token) {
				localStorage.token = response.data.token
				localStorage.userType = response.data.type
				callback(true)
			} else {
				callback(false)
			}
		})
	}

}