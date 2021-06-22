<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('filters') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('filter') }}</label>
						<select class="custom-select" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="filter.id" v-for="(filter, i) in this.filters" :key="i">
								<span v-if="filter && filter.equipments">
									{{ filter.equipments.name }}
								</span>
								<span v-if="filter && filter.brands"> / {{ filter.brands.name }} </span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="discountValue" @change="change"/>
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-12">
					<div class="form-group">
						<label>{{ $t('description') }}</label>
						<input class="form-control" type="text" :value="this.description" disabled />
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-6">
					<div class="form-group">
						<label>{{ $t('cash_price') }}</label>
						<input class="form-control" type="text" :value="this.cash_price" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label>{{ $t('forward_price') }}</label>
						<input class="form-control" type="text" :value="this.forward_price" disabled />
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
		props: { id: String, discount: String, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				filters: [],
				description: '',
				cash_price: 0,
				forward_price: 0,
				see_more: false,
				value: this.id,
				firstTime: true,
				discountValue: this.discount
			}
		},
		mounted() {
			this.firstTime = true
			this.load()
		},
		watch: {
			id(to) {
				this.value = to
			},
		},
		methods: {
			load() {
				Equipments.getFiltersByDimension(this.dimension, (result) => {
					this.filters = {}
					for (const i in result.data) {
						const id = result.data[i].id
						this.filters[id] = result.data[i]
						if (this.filters[id].equipment_id == this.equipment.equipment_id) {
							this.value = id
						}
					}
					this.change()
				})
			},
			change() {
				if (this.firstTime) {
					this.firstTime = false
					return
				}
				if (this.filters[this.value]) {
					const data = {
						id: this.value,
						type: 'filters',
						index: this.equipment.index,
						engine: {
							id: this.filters[this.value].engines.id,
							equipment_id: this.filters[this.value].engines.equipment_id,
						},
						lid: {
							id: this.filters[this.value].lids.id,
							equipment_id: this.filters[this.value].lids.equipment_id,
						},
						equipment_id: this.filters[this.value].equipment_id,
						discount: this.discountValue,
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
