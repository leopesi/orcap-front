<template>
	<div class="list">
		<h1><slot name="title" /></h1>
		<table slot="table" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th v-for="(col, i) in this.cols" :key="i">{{ col }}</th>
					<th>{{ $t('edit') }}</th>
					<th>{{ $t('delete') }}</th>
				</tr>
			</thead>
			<tbody slot="body">
				<tr v-for="(item, i) in this.itens" :key="i">
					<td v-for="(col, c) in cols" :key="c">
						{{ item[col] }}
					</td>
					<td>{{ $t('edit') }}</td>
					<td>{{ $t('delete') }}</td>
				</tr>
			</tbody>
		</table>
		<div class="list-buttons">
			<button>Novo</button>
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
		methods: {},
	}
</script>
