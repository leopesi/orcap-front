<template>
	<div class="list">
		<div :class="'card mx-auto form-' + this.size">
			<div class="card-header">
				<slot name="title" />
			</div>
			<form class="card-body" @keyup="keyUp">
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
						<button type="button" class="btn btn-primary mr-3" @click="newForm">
							{{ $t('new') }}
						</button>
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
	import Methods from '../../../helpers/methods'
	import messages from './messages'
	import './style.css'
	export default {
		name: 'List',
		i18n: { messages },
		props: { size: String, newURL: String },
		mounted() {},
		beforeDestroy() {},
		methods: {
			saveForm() {
				this.$emit('save')
			},
			newForm() {
				this.$router.back()
				setTimeout(() => {
					if (this.newURL) {
						Methods.openPage(this, this.newURL)
					} else {
						this.$router.push(this.$router.history.current.path + '/0')
					}
				}, 10)
			},
			back() {
				this.$router.back()
			},
			keyUp(e) {
				if (e.key == 'Enter') {
					e.srcElement.blur()
					this.saveForm()
				}
			},
		},
	}
</script>
