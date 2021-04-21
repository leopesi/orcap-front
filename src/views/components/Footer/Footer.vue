<template>
	<div class="footer" v-if="this.logged">
		<p>FOOTER</p>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Footer',
		props: { logged: Boolean },
		i18n: { messages },
		mounted() {
			
		},
	}
</script>
