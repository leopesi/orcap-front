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
	import Vinyls from '../../../../controllers/equipments/vinyls'

	import messages from './messages'
	export default {
		name: 'VinylList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: [{ equipments: ['name'] }, { providers: ['name'] }, { brands: ['name'] }],
				itens: [],
				messages,
			}
		},
		mounted() {
			this.load()
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
		},
	}
</script>
