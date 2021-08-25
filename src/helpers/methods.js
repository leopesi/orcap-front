import axios from 'axios'

export default {
	openPage(view, page, need_login) {
		if (view.$router.history.current.path != '/' + page) {
			if (need_login == undefined || need_login == true) localStorage.need_login = true
			else delete localStorage.need_login
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

	fixSequelizeOnlyDate(date) {
		if (!date) {
			return undefined
		} else {
			return date
				.split('.')
				.reverse()
				.slice(1)
				.join('.')
				.split(' ')[0]
				.split('T')[0]
		}
	},

	fixSequelizeDate(date) {
		if (!date) {
			return undefined
		} else {
			return date
				.split('.')
				.reverse()
				.slice(1)
				.join('.')
		}
	},

	fixNumber(number, default_number) {
		if (!default_number) default_number = 0
		if (isNaN(parseFloat(default_number))) {
			default_number = 0
		}
		if (!number) number = default_number
		number = parseFloat(number)
		if (isNaN(number)) {
			number = default_number
		}
		return parseFloat(number)
	},
}
