<template>
	<div class="list">
		<div :class="'card mx-auto form-' + this.size">
			<div class="card-header">
				<slot name="title" />
			</div>
			<form class="card-body">
				<slot name="default" />
			</form>
			<div class="card-footer">
				<div class="row">
					<div class="col-sm-6">
						<button type="button" class="btn btn-primary" @click="saveForm">
							{{ $t('save') }}
						</button>
					</div>
					<div class="col-sm-6 text-right">
						<button type="button" class="btn btn-secondary" @click="back">
							{{ $t('back') }}
						</button>
					</div>
				</div>
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
		props: { size: String },
		mounted() {},
		methods: {
			saveForm() {
				this.$emit('save')
			},back() {
				this.$router.back()
			},
		},
	}
</script>

<style scoped>
	.form-small {
		width: 400px;
	}
	.form-medium {
		width: 600px;
	}
	.form-large {
		width: 800px;
	}
</style>
