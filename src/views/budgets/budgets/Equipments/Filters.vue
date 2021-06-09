<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('filters') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label for="filter">{{ $t('filter') }}</label>
						<select class="custom-select" id="filter" v-model="form.filter" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="filter.id" v-for="(filter, i) in this.filters" :key="i">
								<span v-if="filter.equipments && filter.brands"> {{ filter.equipments.name }} / {{ filter.brands.name }} </span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="discount">{{ $t('discount') }}</label>
						<input class="form-control" id="discount" type="number" :value="this.discount" />
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="description">{{ $t('description') }}</label>
						<input class="form-control" id="description" type="text" :value="this.description" disabled />
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="cash_price">{{ $t('cash_price') }}</label>
						<input class="form-control" id="cash_price" type="text" :value="this.cash_price" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="forward_price">{{ $t('forward_price') }}</label>
						<input class="form-control" id="forward_price" type="text" :value="this.forward_price" disabled />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Equipments from '../../../../controllers/budgets/equipments'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Filters',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				filters: [],
				discount: 0,
				description: '',
				cash_price: 0,
				forward_price: 0,
				see_more: false,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getFiltersByDimension(this.form.dimension, (result) => {
					this.filters = {}
					for (const i in result.data) {
						this.filters[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.filters[this.form.filter]) {
					this.description = this.filters[this.form.filter].equipments.description
					this.cash_price = this.filters[this.form.filter].equipments.cash_price
					this.forward_price = this.filters[this.form.filter].equipments.forward_price
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['filter'] = {
						id: this.filters[this.form.filter].id,
						cash_price: this.filters[this.form.filter].equipments.cash_price,
						forward_price: this.filters[this.form.filter].equipments.forward_price,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
