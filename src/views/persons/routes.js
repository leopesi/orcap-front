import Vue from 'vue'
import Router from 'vue-router'

import Home from './sessions/Home/Home'
import Login from './sessions/Login/Login'

import SessionList from './sessions/SessionList/SessionList'
import SessionForm from './sessions/SessionForm/SessionForm'

import UserList from './users/UserList/UserList'
import UserForm from './users/UserForm/UserForm'

import LogistForm from './logists/LogistForm/LogistForm'
import LogistList from './logists/LogistList/LogistList'

Vue.use(Router)

export default [
	{ path: '/', component: Login },
	{ path: '/home', component: Home },
	{ path: '/sessions', component: SessionList },
	{ path: '/sessions/:id', component: SessionForm, props: true },
	{ path: '/users', component: UserList },
	{ path: '/users/:id', component: UserForm, props: true },
	{ path: '/logists', component: LogistList },
	{ path: '/logists/:id', component: LogistForm, props: true },
]
