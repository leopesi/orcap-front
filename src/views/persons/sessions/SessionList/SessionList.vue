<template>
	<div class="home">
		<List :cols="this.cols" :itens="this.itens" @new="newSession" @edit="editSession">
			<div slot="title">
				{{ $t('title') }}
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Sessions from '../../../../controllers/persons/sessions'

	import messages from './messages'
	export default {
		name: 'SessionList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: ['id', 'mail'],
				itens: [],
			}
		},
		mounted() {
			this.loadItens()
		},
		methods: {
			loadItens() {
				Sessions.sessions((result) => {
					this.itens = result.data
				})
			},
			newSession() {
				Methods.openPage(this, 'sessions/0')
			},
			editSession(id) {
				Methods.openPage(this, 'sessions/' + id)
			},
		},
	}
</script>
