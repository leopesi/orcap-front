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
	import Vinyls from '../../../../controllers/equipments/vinyls'

	import messages from './messages'
	export default {
		name: 'VinylList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: [{ equipments: ['name'] }, { providers: ['name'] }, { brands: ['name'] }],
				filters: { equipments: { name: '' } },
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
						if (!this.filters.equipments) this.filters.equipments = {}
						if (!this.filters.equipments.name) this.filters.equipments.name = ''

						if (!item.equipments) item.equipments = {}
						if (!item.equipments.name) item.equipments.name = ''

						if (
							item.equipments.name
								.toString()
								.toLowerCase()
								.indexOf(this.filters.equipments.name.toString().toLowerCase()) !== -1
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
				Vinyls.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'vinyls/0')
			},
			edit(id) {
				Methods.openPage(this, 'vinyls/' + id)
			},
			del(id) {
				Vinyls.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
