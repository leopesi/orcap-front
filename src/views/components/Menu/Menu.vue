<template>
	<div class="menu" v-if="this.show">
		<div class="menu-header" @click="open('home')">
			{{ $t('home') }}
		</div>
		<div class="menu-item" v-for="(header, i) in this.menus" :key="i">
			<div class="menu-header" @click="changeMenu(i)" v-if="typeof header === 'object'">
				{{ $t(i) }}
			</div>
			<div class="menu-header" @click="open(i)" v-if="typeof header === 'string'">
				{{ $t(i) }}
			</div>
			<div class="menu-body" v-if="actual == i && typeof header === 'object'">
				<div class="link" @click="open(menu)" v-for="(menu, j) in header" :key="j">
					{{ $t(j) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Methods from '../../../helpers/methods'
	import Menus from './menus'
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Menu',
		i18n: { messages },
		data() {
			return {
				menus: Menus,
				actual: Object.keys(Menus)[0],
				show: localStorage.userType ? true : false,
			}
		},
		mounted() {
			this.show = localStorage.userType ? true : false
			this.actual = localStorage.selectedMenu
		},
		methods: {
			open(page) {
				Methods.openPage(this, page)
			},
			changeMenu(menu) {
				localStorage.selectedMenu = menu
				this.actual = menu
			},
		},
	}
</script>
