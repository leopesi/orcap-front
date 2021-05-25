import Vue from 'vue'
import Router from 'vue-router'

import Persons from './views/persons/routes'
import Budgets from './views/budgets/routes'
import Equipments from './views/equipments/routes'


Vue.use(Router)

export default [
	...Persons,
	...Budgets,
	...Equipments
]
