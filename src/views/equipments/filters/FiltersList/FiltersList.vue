<template>
	<div class="home">
		<List :cols="this.cols" :itens="this.itens" @new="create" @edit="edit">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Filters from '../../../../controllers/equipments/filters'

	import messages from './messages'
	export default {
		name: 'UserList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['id', 'name', 'phone', { sessions: ['mail']}],
				itens: [],
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Filters.filters((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'filters/0')
			},
			edit(id) {
				Methods.openPage(this, 'filters/' + id)
			},
		},
	}
</script>
