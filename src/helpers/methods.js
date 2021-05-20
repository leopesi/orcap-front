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

	setLocaleMessage(view, messages1, messages2) {
		for (const i in messages2) {
			view.$i18n.setLocaleMessage(i, Object.assign(messages1[i], messages2[i]))
		}
	},
}
