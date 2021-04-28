<template>
	<div class="alert" v-if="this.message">
		<div class="shadow" />
		<div class="card">
			<div class="title">
				<h1>{{ this.title }}</h1>
				<button @click="$emit('close')">x</button>
			</div>
			<div class="message">
				{{ this.message }}
			</div>
			<div class="buttons">
				<button @click="$emit('close')">{{ $t('close') }}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Alert',
		props: { title: String, message: String },
		i18n: { messages },
		mounted() {},
	}
</script>
