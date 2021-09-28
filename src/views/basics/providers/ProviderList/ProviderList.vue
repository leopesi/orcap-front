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
	import Providers from '../../../../controllers/basics/providers'

	import messages from './messages'
	export default {
		name: 'ProviderList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['name', 'mail'],
				filters: { name: '' },
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
					if (!this.filters.name) this.filters.name = ''
					if (!item.name) item.name = ''
					if (item.logist_id == undefined) item.disabled = true
					if (
						item.name
							.toString()
							.toLowerCase()
							.indexOf(this.filters.name.toString().toLowerCase()) !== -1 &&
						(item.logist_id == localStorage.logistID || item.logist_id == undefined)
					) {
						return item
					}
				})
			},
		},
		methods: {
			load() {
				Providers.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'providers/0')
			},
			edit(id) {
				Methods.openPage(this, 'providers/' + id)
			},
			del(id) {
				Providers.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
