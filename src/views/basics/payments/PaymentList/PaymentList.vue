<template>
	<div class="home">
		<List :cols="this.cols" :itens="this.itens" @new="create" @edit="edit" :messages="this.messages">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Payments from '../../../../controllers/basics/payments'

	import messages from './messages'
	export default {
		name: 'PaymentsList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['name'],
				itens: [],
				messages,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Payments.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'payments/0')
			},
			edit(id) {
				Methods.openPage(this, 'payments/' + id)
			},
		},
	}
</script>
