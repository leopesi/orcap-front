<template>
	<div class="header row" v-if="this.show">
		<div class="link col-sm-9">
			<div class="row">
				<div class="col-sm-1 px-5">
					EasyPool
				</div>
				<div class="col-sm-10">
					<Menu v-if="this.show" />
				</div>
			</div>
		</div>
		<div class="link col-sm-2 text-right">
			<span class="logist-name">
				{{ this.name }}
			</span>
		</div>
		<div class="col-sm-1 link" @click="logout">
			{{ $t('sair') }}
		</div>
	</div>
</template>

<script>
	import Global from '../../../helpers/global'
	import Methods from '../../../helpers/methods'
	import Menu from '../Menu/Menu.vue'
	import messages from './messages'
	import './style.css'

	export default {
		name: 'Header',
		components: { Menu },
		i18n: { messages },
		data() {
			return {
				name: localStorage.userName,
				show: localStorage.userType ? true : false,
			}
		},
		mounted() {
			this.show = localStorage.userType ? true : false
			Global.$on('change-header-name', (name) => {
				localStorage.userName = name
				this.name = name
			})
		},
		beforeDestroy() {
			Global.$off('change-header-name')
		},
		methods: {
			logout() {
				Methods.logout(this)
			},
		},
	}
</script>
