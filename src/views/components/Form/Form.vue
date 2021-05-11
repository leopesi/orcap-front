<template>
	<div class="list">
		<div class="card">
			<div class="card-header">
				<slot name="title" />
			</div>
			<form class="card-body">
				<slot name="default" />
			</form>
			<div class="card-footer">
				<button type="button" class="btn btn-primary" @click="saveForm">{{ $t('save') }}</button>
			</div>
		</div>
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
