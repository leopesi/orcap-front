<template>
	<div class="home">
		<List :filters="this.filters" :itens="this.filteredItens" @edit="edit" @new="create" :messages="this.messages" @delete="del">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div slot="table">
				<table slot="table" class="table table-striped" cellpadding="0" cellspacing="0">
					<thead class="thead-dark">
						<tr>
							<th>{{ $t('clients') }}</th>
							<th>{{ $t('sellers') }}</th>
							<th>{{ $t('edit') }} / {{ $t('see') }}</th>
							<th>{{ $t('delete') }}</th>
						</tr>
					</thead>
					<tbody class="thead-dark">
						<tr v-for="(item, i) in this.filteredItens" :key="i">
							<td>{{ item.clients ? item.clients.name : '' }}</td>
							<td>{{ item.sellers ? item.sellers.name : '' }}</td>
							<td v-if="item.status == 'finished'" @click="see(item.id)">{{ $t('see') }}</td>
							<td v-else @click="edit(item.id)">{{ $t('edit') }}</td>
							<td @click="del(item.id)">{{ $t('delete') }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</List>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import List from '../../../components/List/List'
	import Budgets from '../../../../controllers/budgets/budgets'

	import messages from './messages'
	export default {
		name: 'LogistList',
		i18n: { messages },
		components: { List },
		data() {
			return {
				cols: [
					// 'id',
					{ clients: ['name'] },
					{ sellers: ['name'] },
				],
				filters: { clients: { name: '', neighborhood: '' } /*sellers: { name: '' }*/ },
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
						if (!this.filters.clients) this.filters.clients = {}
						//if (!this.filters.sellers) this.filters.sellers = {}
						if (!this.filters.clients.name) this.filters.clients.name = ''
						if (!this.filters.clients.neighborhood) this.filters.clients.neighborhood = ''
						//if (!this.filters.sellers.name) this.filters.sellers.name = ''
						if (!item.clients) item.clients = {}
						//if (!item.sellers) item.sellers = {}
						if (!item.clients.name) item.clients.name = ''
						if (!item.clients.neighborhood) item.clients.neighborhood = ''
						//if (!item.sellers.name) item.sellers.name = ''
						if (
							item.clients.name
								.toString()
								.toLowerCase()
								.indexOf(this.filters.clients.name.toString().toLowerCase()) !== -1 &&
							item.clients.neighborhood
								.toString()
								.toLowerCase()
								.indexOf(this.filters.clients.neighborhood.toString().toLowerCase()) !== -1
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
				Budgets.budgets((result) => {
					this.itens = result.data
				})
			},
			create() {
				Methods.openPage(this, 'budget')
			},
			see(id) {
				Methods.openPage(this, 'budget-pdf/' + id)
			},
			edit(id) {
				Methods.openPage(this, 'budget/' + id)
			},
			del(id) {
				Budgets.delete(id, () => {
					this.load()
				})
			},
		},
	}
</script>
