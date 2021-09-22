import axios from 'axios'

export default {
	
	// Seta as rotas do Controller ( back-end - controllers/equipaments/sands.js)

	getFiltersByDimension(dimension, callback) {
		axios.post('/filters-by-dimension', dimension)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getEnginesByFilters(callback) {
		axios.post('/engines-by-filters')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getLidsByFilters(callback) {
		axios.post('/lids-by-filters')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	
	getSandsByFilters(callback) {
		axios.post('/sands-by-filters')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getBlanketsByLogist(callback) {
		axios.post('/blankets-by-logist')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getProfilesByLogist(callback) {
		axios.post('/profiles-by-logist')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getVinylsByLogist(callback) {
		axios.post('/vinyls-by-logist')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

}