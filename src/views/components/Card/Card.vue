<template>
	<div class="card">
		<div :class="'card-visibility ' + (this.showBody ? 'show-body' : 'hide-body')">
			<button @click="changeVisibility">
				<i class="bi-arrow-up-circle" role="img" v-if="this.showBody"></i>
				<i class="bi-arrow-down-circle" role="img" v-if="!this.showBody"></i>
			</button>
			<slot class="slot" name="default" />
		</div>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Card',
		i18n: { messages },
		props: { size: String },
		data() {
			return {
				showBody: true,
			}
		},
		mounted() {},
		beforeDestroy() {},
		methods: {
			changeVisibility() {
				console.log(this.showBody)
				this.showBody = !this.showBody
			},
		},
	}
</script>
