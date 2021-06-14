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
	import Engines from '../../../../controllers/equipments/engines'

	import messages from './messages'
	export default {
		name: 'EngineList',
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
				Engines.list((result) => {
					console.log(result)
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'engines/0')
			},
			edit(id) {
				Methods.openPage(this, 'engines/' + id)
			},
		},
	}
</script>
