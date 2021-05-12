<template>
	<div class="menu" v-if="this.logged">
		<div class="link" @click="open('home')">
			{{ $t('home') }}
		</div>
		<div class="link" @click="open('new-budgets')">
			{{ $t('new_budgets') }}
		</div>
		<div class="link" @click="open('budgets')">
			{{ $t('list_budgets') }}
		</div>
		<div class="link" @click="open('sessions')">
			{{ $t('sessions') }}
		</div>
		<div class="link" @click="open('users')">
			{{ $t('users') }}
		</div>
		<div class="link" @click="open('logists')">
			{{ $t('logists') }}
		</div>
		<div class="link" @click="open('sellers')">
			{{ $t('sellers') }}
		</div>
		<div class="link" @click="open('clients')">
			{{ $t('clients') }}
		</div>
	</div>
</template>

<script>
	import Methods from '../../../helpers/methods'

	import messages from './messages'
	import './style.css'
	export default {
		name: 'Menu',
		props: { logged: Boolean },
		i18n: { messages },
		mounted() {},
		methods: {
			open(page) {
				Methods.openPage(this, page)
			},
		},
	}
</script>
