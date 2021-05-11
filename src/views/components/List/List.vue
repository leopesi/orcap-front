<template>
	<div class="list card">
		<div class="card-header">
			<slot name="title" />
		</div>
		<div class="card-body">
			<table slot="table" class="table table-striped" cellpadding="0" cellspacing="0">
				<thead class="thead-dark">
					<tr>
						<th v-for="(col, i) in this.cols" :key="i">
							<div v-if="typeof col === 'string'">{{ col }}</div>
							<div v-if="typeof col === 'object'">
								<div v-for="(rels, j) in col" :key="j">
									<div v-for="(itemcol, k) in rels" :key="k">
										{{ itemcol }}
									</div>
								</div>
							</div>
						</th>
						<th>{{ $t('edit') }}</th>
						<th>{{ $t('delete') }}</th>
					</tr>
				</thead>
				<tbody slot="body">
					<tr v-for="(item, i) in this.itens" :key="i" @click="buttonEdit(item.id)">
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
						<td>{{ $t('edit') }}</td>
						<td>{{ $t('delete') }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="card-footer">
			<button type="button" class="btn btn-primary" @click="buttonNew">Novo</button>
		</div>
	</div>
</template>

<script>
	import messages from './messages'
	import './style.css'
	export default {
		name: 'List',
		props: { cols: Array, itens: Array },
		i18n: { messages },
		mounted() {},
		methods: {
			buttonNew() {
				this.$emit('new', 0)
			},
			buttonEdit(id) {
				this.$emit('edit', id)
			},
		},
	}
</script>
