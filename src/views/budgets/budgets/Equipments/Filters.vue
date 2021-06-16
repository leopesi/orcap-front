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
						<select class="custom-select" id="filter" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="filter.id" v-for="(filter, i) in this.filters" :key="i">
								<span v-if="filter && filter.equipments">
									{{ filter.equipments.name }}
								</span>
								<span v-if="filter && filter.brands">
									/ {{ filter.brands.name }}
								</span>
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
		props: { id: String, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				filters: [],
				discount: 0,
				description: '',
				cash_price: 0,
				forward_price: 0,
				see_more: false,
				value: this.id
			}
		},
		mounted() {
			this.load()
		},
		watch: {
			id(to) {
				this.value = to
			}
		},
		methods: {
			load() {
				Equipments.getFiltersByDimension(this.dimension, (result) => {
					this.filters = {}
					for (const i in result.data) {
						this.filters[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.filters[this.value]) {
					const data = {
						id: this.value,
						index: this.equipment.index,
						engine_id: this.filters[this.value].engine_id,
						lid_id: this.filters[this.value].lid_id
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
