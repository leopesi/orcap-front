import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/sessions/Home/Home'
import Login from './views/sessions/Login/Login'

import UserList from './views/users/UserList/UserList'

Vue.use(Router)

export default [
	{ path: '/', component: Login },
	{ path: '/home', component: Home },
	{ path: '/users', component: UserList },
]
