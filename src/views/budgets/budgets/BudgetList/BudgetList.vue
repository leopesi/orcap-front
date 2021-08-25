<template>
	<div class="home">
		<List :cols="this.cols" :filters="this.filters" :itens="this.filteredItens" @edit="edit" @new="create" :messages="this.messages" @delete="del">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Budgets from '../../../../controllers/budgets/budgets'

	import messages from './messages'
	export default {
		name: 'LogistList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: [
					// 'id',
					{ clients: ['name', 'document'] },
					{ sellers: ['name'] },
				],
				filters: { clients: { name: '', document: '' }, sellers: { name: '' } },
				itens: [],
				messages,
			}
		},
		mounted() {
			this.load()
		},
		computed: {
			filteredItens() {
				return this.itens.filter((item) => {
					if (!this.filters.clients) this.filters.clients = {}
					if (!this.filters.sellers) this.filters.sellers = {}
					if (!this.filters.clients.name) this.filters.clients.name = ''
					if (!this.filters.clients.document) this.filters.clients.document = ''
					if (!this.filters.sellers.name) this.filters.sellers.name = ''
					if (!item.clients) item.clients = {}
					if (!item.sellers) item.sellers = {}
					if (!item.clients.name) item.clients.name = ''
					if (!item.clients.document) item.clients.document = ''
					if (!item.sellers.name) item.sellers.name = ''
					if (
						item.clients.name
							.toString()
							.toLowerCase()
							.indexOf(this.filters.clients.name.toString().toLowerCase()) !== -1 &&
						item.clients.document
							.toString()
							.toLowerCase()
							.indexOf(this.filters.clients.document.toString().toLowerCase()) !== -1 &&	
						item.sellers.name
							.toString()
							.toLowerCase()
							.indexOf(this.filters.sellers.name.toString().toLowerCase()) !== -1
					) {
						return item
					}
				})
			},
		},
		methods: {
			load() {
				Budgets.budgets((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'budget')
			},
			edit(id) {
				Methods.openPage(this, 'budget/' + id)
			},
			del(id) {
				Budgets.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
