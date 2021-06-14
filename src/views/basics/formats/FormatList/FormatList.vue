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
	import Formats from '../../../../controllers/basics/formats'

	import messages from './messages'
	export default {
		name: 'FormatList',
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
				Formats.list((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'formats/0')
			},
			edit(id) {
				Methods.openPage(this, 'formats/' + id)
			},
		},
	}
</script>
