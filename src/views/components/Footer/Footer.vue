<template>
	<div class="footer" v-if="this.show">
		<p>FOOTER</p>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Footer',
		i18n: { messages },
		data() {
			return {
				show: localStorage.userType ? true : false,
			}
		},
		mounted() {
			this.show = localStorage.userType ? true : false
		},
	}
</script>
