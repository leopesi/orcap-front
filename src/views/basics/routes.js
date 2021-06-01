import Vue from 'vue'
import Router from 'vue-router'

import ProviderList from './providers/ProviderList/ProviderList'
import ProviderForm from './providers/ProviderForm/ProviderForm'

import BrandList from './brands/BrandList/BrandList'
import BrandForm from './brands/BrandForm/BrandForm'

import PaymentList from './payments/PaymentList/PaymentList'
import PaymentForm from './payments/PaymentForm/PaymentForm'

import FormatList from './formats/FormatList/FormatList'
import FormatForm from './formats/FormatForm/FormatForm'

Vue.use(Router)

export default [
	{ path: '/providers', component: ProviderList },
	{ path: '/providers/:id', component: ProviderForm, props: true },
	{ path: '/brands', component: BrandList },
	{ path: '/brands/:id', component: BrandForm, props: true },
	{ path: '/payments', component: PaymentList },
	{ path: '/payments/:id', component: PaymentForm, props: true },
	{ path: '/formats', component: FormatList },
	{ path: '/formats/:id', component: FormatForm, props: true },
]
