import Vue from 'vue'
import Router from 'vue-router'

import FiltersForm from './filters/FiltersForm/FiltersForm'
import FiltersList from './filters/FiltersList/FiltersList'

Vue.use(Router)

export default [
	{ path: '/filters', component: FiltersList },
	{ path: '/filters/:id', component: FiltersForm, props: true },
]
