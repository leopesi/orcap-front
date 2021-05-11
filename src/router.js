import Vue from 'vue'
import Router from 'vue-router'

import Persons from './views/persons/routes'


Vue.use(Router)

export default [
	...Persons
]
