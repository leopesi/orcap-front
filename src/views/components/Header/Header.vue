<template>
	<div class="header" v-if="this.logged">
		<div class="link" @click="logout">
			{{ $t('sair') }}
		</div>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'

	export default {
		name: 'Header',
		props: { logged: Boolean },
		i18n: { messages },
		mounted() {
			
		},
		methods: {
			logout() {
				delete localStorage.token
				delete localStorage.userType
				this.$router.push('/')
			}
		}
	}
</script>
