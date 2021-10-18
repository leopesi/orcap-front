<template>
	<div class="home">
		<List :cols="this.cols" :filters="this.filters" :itens="this.filteredItens" @new="create" @edit="edit" @delete="del" :messages="this.messages">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Clients from '../../../../controllers/persons/clients'

	import messages from './messages'
	export default {
		name: 'ClientsList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['name', 'phone', { sessions: ['mail'] }, 'city', 'neighborhood'],
				filters: { name: '', neighborhood: '' },
				itens: [],
				messages,
			}
		},
		mounted() {
			this.load()
		},
		computed: {
			filteredItens() {
				if (this.itens) {
					return this.itens.filter((item) => {
						if (!this.filters.name) this.filters.name = ''
						if (!this.filters.neighborhood) this.filters.neighborhood = ''
						if (!item.name) item.name = ''
						if (!item.neighborhood) item.neighborhood = ''
						if (
							item.name
								.toString()
								.toLowerCase()
								.indexOf(this.filters.name.toString().toLowerCase()) !== -1 &&
							item.neighborhood
								.toString()
								.toLowerCase()
								.indexOf(this.filters.neighborhood.toString().toLowerCase()) !== -1
						) {
							return item
						}
					})
				} else {
					return []
				}
			},
		},
		methods: {
			load() {
				Clients.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'clients/0')
			},
			edit(id) {
				Methods.openPage(this, 'clients/' + id)
			},
			del(id) {
				Clients.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
