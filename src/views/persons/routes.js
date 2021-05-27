import Vue from 'vue'
import Router from 'vue-router'

import Home from './sessions/Home/Home'
import Login from './sessions/Login/Login'

import LogistForm from './logists/LogistForm/LogistForm'

import SellerForm from './sellers/SellerForm/SellerForm'
import SellerList from './sellers/SellerList/SellerList'

import ClientForm from './clients/ClientForm/ClientForm'
import ClientList from './clients/ClientList/ClientList'

Vue.use(Router)

export default [
	{ path: '/', component: Login },
	{ path: '/home', component: Home },
	{ path: '/logists/:id', component: LogistForm, props: true },
	{ path: '/sellers', component: SellerList },
	{ path: '/sellers/:id', component: SellerForm, props: true },
	{ path: '/clients', component: ClientList },
	{ path: '/clients/:id', component: ClientForm, props: true },
]
