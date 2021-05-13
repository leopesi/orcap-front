<template>
	<div class="card" v-if="this.form">
		<div class="card-header">
			{{ $t('filters') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="filter">{{ $t('length') }}</label>
						<input
							class="form-control"
							id="filter"
							v-model="form.length"
							type="number"
							step="0.01"
							@keyup="load"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Filters from '../../../../controllers/equipments/filters'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Filters',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				interval: null,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Filters.getFiltersByDimension(this.form, (result) => {
					console.log(result)
				})
			},
		},
	}
</script>
