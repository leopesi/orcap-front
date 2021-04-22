<template>
	<div class="list">
		<h1><slot name="title" /></h1>
		<form class="form">
			<slot name="default" />
		</form>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'List',
		i18n: { messages },
		mounted() {},
		methods: {},
	}
</script>
