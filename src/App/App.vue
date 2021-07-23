<template>
	<div id="app">
		<Header v-if="this.logged" />
		<div class="body">
			<router-view class="views"></router-view>
		</div>
		<Footer v-if="this.logged" />
	</div>
</template>

<script>
	import Methods from '../helpers/methods'

	import Header from '../views/components/Header/Header'
	import Footer from '../views/components/Footer/Footer'

	import messages from './messages'
	import './style.css'
	import '../assets/css'

	export default {
		name: 'App',
		components: { Header, Footer },
		i18n: { messages },
		data() {
			return {
				logged: false,
			}
		},
		watch: {
			$route() {
				this.logged = localStorage.token ? true : false
				this.checkLogin()
			},
		},
		mounted() {
			localStorage.need_login = true
			this.logged = localStorage.token ? true : false
			this.checkLogin()
		},
		methods: {
			checkLogin() {
				if (!this.logged) {
					if (localStorage.need_login) {
						Methods.openPage(this, '')
					}
				}
			},
		},
	}
</script>
