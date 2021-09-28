<template>
	<div class="home">
		<List :cols="this.cols" :filters="this.filters" :itens="this.filteredItens" @new="create" @edit="edit" :messages="this.messages">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Profiles from '../../../../controllers/equipments/profiles'

	import messages from './messages'
	export default {
		name: 'ProfileList',
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
			},
		},
		methods: {
			load() {
				Profiles.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'profiles/0')
			},
			edit(id) {
				Methods.openPage(this, 'profiles/' + id)
			},
			del(id) {
				Profiles.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
