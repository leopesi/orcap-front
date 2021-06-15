import Vue from 'vue'
import Router from 'vue-router'

import ProviderList from './providers/ProviderList/ProviderList'
import ProviderForm from './providers/ProviderForm/ProviderForm'

import BrandList from './brands/BrandList/BrandList'
import BrandForm from './brands/BrandForm/BrandForm'

Vue.use(Router)

export default [
	{ path: '/providers', component: ProviderList },
	{ path: '/providers/:id', component: ProviderForm, props: true },
	{ path: '/brands', component: BrandList },
	{ path: '/brands/:id', component: BrandForm, props: true },
]
