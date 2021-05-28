import Vue from 'vue'
import Router from 'vue-router'

import BrandList from './brands/BrandList/BrandList'
import BrandForm from './brands/BrandForm/BrandForm'

Vue.use(Router)

export default [
	{ path: '/brands', component: BrandList },
	{ path: '/brands/:id', component: BrandForm, props: true },
]
