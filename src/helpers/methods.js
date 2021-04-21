import axios from 'axios'

export default {
	openPage(view, page) {
		if (view.$router.history.current.path != '/' + page) {
			view.$router.push('/' + page)
		}
	},

	logout(view) {
		delete axios.defaults.headers.common['Authorization']
		delete localStorage.token
		delete localStorage.userType
		this.openPage(view, '')
	},
}
