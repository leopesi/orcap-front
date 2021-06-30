<template>
	<div
		v-if="this.show"
		:class="'modal fade ' + (this.show ? 'show' : '')"
		id="modal-alert"
		tabindex="-1"
		aria-labelledby="modal-alert-label"
		aria-hidden="true"
		:style="this.show ? 'display: block;' : 'display: none;'"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal-alert-label">{{ this.title }}</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<slot name="default"/>
				</div>
				<div class="modal-footer">
					<slot name="footer"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Alert',
		props: { title: String, show: Boolean },
		i18n: { messages },
		data() {
			return {
				eventListener: undefined
			}
		},
		mounted() {},
		watch: {
			show(to) {
				if (to) {
					this.eventListener = (e) => {
						this.keyUp(e)
					}
					document.addEventListener('keyup', this.eventListener)
				} else {
					this.show = false
					document.removeEventListener('keyup', this.eventListener)
				}
			},
		},
		methods: {
			close() {
				this.$emit('close')
			},
			keyUp(e) {
				if (e.code == 'Escape' || e.code == 'Space') {
					this.close()
				}
			},
		},
	}
</script>

<style scoped>
	#modal-alert {
		background: #00000066;
	}
</style>
