import axios from 'axios'

export default {

	getFiltersByDimension(data, callback) {
		axios.post('/filters-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getEnginesByDimension(data, callback) {
		axios.post('/engines-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getLidsByFilters(data, callback) {
		axios.post('/lids-by-filters', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getBlanketsByDimension(data, callback) {
		axios.post('/blankets-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getProfilesByDimension(data, callback) {
		axios.post('/profiles-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getVinylsByDimension(data, callback) {
		axios.post('/vinyls-by-dimension', data)
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

}