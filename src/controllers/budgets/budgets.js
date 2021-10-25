import axios from 'axios'
import Cruds from '../defaults/cruds'

export default {
	budgets(callback) {
		axios.get('/budgets').then((response) => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	getBudget(id, callback) {
		axios.get('/budgets/' + id).then((response) => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	insertBudget(data, callback) {
		axios.post('/budgets/', data).then((response) => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	updateBudget(data, callback) {
		axios.put('/budgets/' + data.id, data).then((response) => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	finishBudget(data, callback) {
		axios.put('/budgets/' + data.id + '/finish', data).then((response) => {
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	duplicateBudget(data, callback) {
		delete data.id
		data.status = 'opened'
		const equipments = []
		for (const i in data.equipments) {
			equipments.push({
				equipment_id: data.equipments[i].equipment_id,
				index: data.equipments[i].index,
				type: data.equipments[i].type,
				text: data.equipments[i].text,
				cost: data.equipments[i].cost,
				profit_margin: data.equipments[i].profit_margin,
				price: data.equipments[i].price,
				final_price: data.equipments[i].final_price,
				man_power: data.equipments[i].man_power,
				discount: data.equipments[i].discount,
			})
		}
		data.equipments = equipments
		delete data.logists
		delete data.sellers
		delete data.clients
		delete data.formats
    delete data.createdAt
    delete data.updatedAt
    delete data.expiration_date
		axios.post('/budgets/', data).then((response) => {
      console.log(response.data)
			if (response && response.data) {
				callback(response.data)
			} else {
				callback({})
			}
		})
	},

	delete(data, callback) {
		Cruds.delete('/budgets/', data, (result) => callback(result))
	},
}
