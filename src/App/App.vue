<template>
	<div id="app">
		<Header :logged="this.logged" />
		<div class="body">
			<Menu :logged="this.logged" />
			<router-view class="views"></router-view>
		</div>
		<Footer :logged="this.logged" />
	</div>
</template>

<script>

	import Methods from '../helpers/methods'

	import Header from '../views/components/Header/Header'
	import Footer from '../views/components/Footer/Footer'
	import Menu from '../views/components/Menu/Menu'

	import './style.css'
	import '../assets/css'

	export default {
		name: 'App',
		components: { Header, Footer, Menu },
		data() {
			return {
				logged: false,
			}
		},
		watch: {
			$route() {
				this.logged = localStorage.token ? true : false
			},
		},
		mounted() {
			this.logged = localStorage.token ? true : false
			if (!this.logged) Methods.openPage(this, '')
		},
	}
</script>
