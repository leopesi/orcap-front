export default {
	openPage(view, page) {
		if (view.$router.history.current.path != '/' + page) {
			view.$router.push('/' + page)
		}
	},
}
