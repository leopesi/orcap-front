<template>
	<div class="home">
		<List :cols="this.cols" :itens="this.itens">
			<div slot="title">
				{{ $t('title') }}
			</div>
			
		</List>
	</div>
</template>

<script>
	import List from '../../components/List/List'
	import Users from '../../../controllers/users'

	import messages from './messages'
	export default {
		name: 'UserList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['id', 'name'],
				itens: [],
			}
		},
		mounted() {
			this.loadItens()
		},
		methods: {
			loadItens() {
				Users.users((result) => {
					this.itens = result.data
				})
			},
		},
	}
</script>
