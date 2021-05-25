<template>
	<div class="header row" v-if="this.show">
		<div class="link col-sm-5"></div>
		<div class="link col-sm-6 text-right">
			{{ this.name }}
		</div>
		<div class="col-sm-1 link" @click="logout">
			{{ $t('sair') }}
		</div>
	</div>
</template>

<script>
	import Methods from '../../../helpers/methods'
	import messages from './messages'
	import './style.css'

	export default {
		name: 'Header',
		i18n: { messages },
		data() {
			return {
				name: localStorage.userName,
				show: localStorage.userType ? true : false,
			}
		},
		mounted() {
			this.show = localStorage.userType ? true : false
		},
		methods: {
			logout() {
				Methods.logout(this)
			},
		},
	}
</script>
