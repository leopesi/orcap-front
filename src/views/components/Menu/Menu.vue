<template>
	<div class="menu" v-if="this.logged">
		<h1>MENU</h1>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Menu',
		props: { logged: Boolean },
		i18n: { messages },
		mounted() {
			
		},
	}
</script>
