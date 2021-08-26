<template>
	<div class="list card">
		<div class="card-header">
			<slot name="title" />
		</div>
		<div class="card-body">
			<Card class="card pb-4" v-if="this.filters">
				<div class="card-header">
					{{ $t('filters') }}
				</div>
				<div class="">
					<div class="row border-bottom mb-4 mx-1">
						<div class="float-left" v-for="(item, i) in this.filters" :key="i">
							<div v-if="typeof item === 'object'">
								<div class="mr-4 float-left form-group" v-for="(listitem, j) in item" :key="j">
									<label for="id">{{ $t(j) + ' ' + $t(i) }}</label>
									<input class="form-control" :id="i" v-model="item[j]" type="text" />
								</div>
							</div>
							<div v-else>
								<div class="mr-4 form-group">
									<label for="id">{{ $t(i) }}</label>
									<input class="form-control" :id="i" v-model="filters[i]" type="text" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<table slot="table" class="table table-striped" cellpadding="0" cellspacing="0">
				<thead class="thead-dark">
					<tr>
						<th v-for="(col, i) in this.columns" :key="i">
							<div v-if="typeof col === 'string'">{{ $t(col) }}</div>
							<div v-if="typeof col === 'object'">
								<div v-for="(rels, j) in col" :key="j">
									{{ $t(j) }}
								</div>
							</div>
						</th>
						<th>{{ $t('edit') }}</th>
						<th>{{ $t('delete') }}</th>
					</tr>
				</thead>
				<tbody slot="body">
					<tr v-for="(item, i) in filteredItens" :key="i">
						<td v-for="(col, c) in cols" :key="c">
							<div v-if="typeof col === 'string'">{{ item[col] }}</div>
							<div v-if="typeof col === 'object'">
								<div v-for="(rels, j) in col" :key="j">
									<div v-for="(itemcol, k) in rels" :key="k">
										{{ item[j] ? item[j][itemcol] : '' }}
									</div>
								</div>
							</div>
						</td>
						<td @click="buttonEdit(item.id)">{{ $t('edit') }}</td>
						<td @click="buttonAlert(item.id)">{{ $t('delete') }}</td>
					</tr>
				</tbody>
			</table>
			<div class="row border-top pt-2 mx-2">
				<div class="col-sm-6 mx-0 px-0">
					<div class="btn" v-for="i in numberItens" :key="i" @click="page = i - 1">
						<button type="button" class="btn btn-primary" v-if="i - 1 == page">{{ i }}</button>
						<div v-else>{{ i }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer">
			<button type="button" class="btn btn-primary" @click="buttonNew">
				Novo
			</button>
		</div>
		<AlertDelete :title="this.alert.title" :message="this.alert.message" @yes="buttonDelete" @close="alert = {}" />
	</div>
</template>

<script>
	import Card from '../Card/Card.vue'
	import Methods from '../../../helpers/methods'
	import AlertDelete from '../AlertDelete/AlertDelete'
	import messages from './messages'
	import './style.css'
	export default {
		name: 'List',
		components: { Card, AlertDelete },
		props: { cols: Array, itens: Array, filters: Object, filterFunction: Function, messages: Object },
		i18n: { messages },
		data() {
			return {
				columns: [],
				alert: {},
				actualDelete: null,
				filter: {},
				limit: 5,
				page: 0,
			}
		},
		beforeMount() {
			this.load()
		},
		mounted() {
			this.load()
		},
		computed: {
			filteredItens() {
				return this.itens.filter((item, i) => {
					if (i >= this.page * this.limit && i < this.page * this.limit + this.limit) return item
				})
			},
			numberItens() {
				let pages = parseInt(this.itens.length / this.limit) + 1
				if (this.itens.length % this.limit == 0) pages --
				return pages
			},
		},
		methods: {
			load() {
				const cols = this.cols
				this.columns = []
				for (const i in cols) {
					if (cols[i] != 'id') this.columns.push(cols[i])
				}
				Methods.setLocaleMessage(this, messages, this.messages)
			},
			buttonNew() {
				this.$emit('new', 0)
			},
			buttonEdit(id) {
				this.$emit('edit', id)
			},
			buttonAlert(id) {
				//colocar uma condição para inserir os parametros no delete
				this.alert = {
					title: 'Deseja deletar?',
					message: 'result.status',
				}
				this.actualDelete = id
			},
			buttonDelete() {
				this.$emit('delete', this.actualDelete)
				this.alert = {}
			},
		},
	}
</script>
