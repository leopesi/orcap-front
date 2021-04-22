<template>
	<div class="list">
		<h1><slot name="title" /></h1>
		<form class="form">
			<slot name="default" />
			<div class="form-buttons">
				<button @click="saveForm">{{ $t('save') }}</button>
			</div>
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
		methods: {
			saveForm() {
				this.$emit('save')
			},
		},
	}
</script>
