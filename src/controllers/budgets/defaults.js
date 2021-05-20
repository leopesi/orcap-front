import axios from 'axios'

export default {

	statusBudgets(callback) {
		
		axios.get('/status_budgets')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	typesBudgets(callback) {
		
		axios.get('/types_budgets')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	payments(callback) {
		
		axios.get('/payments')
		.then(response => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

}