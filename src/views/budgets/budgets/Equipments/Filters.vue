<template>
	<div class="card">
		<div class="card-body" v-if="this.show">
			<div class="row">
				<div class="col-sm-9">
					<div class="form-group">
						<label>{{ $t('filter') }}</label>
						<select class="custom-select" v-model="form.equipments[index].equipment_id" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="filter.equipment_id" v-for="(filter, i) in this.filters" :key="i">
								<span v-if="filter && filter.equipments">
									{{ filter.equipments.name }}
								</span>
								<span v-if="filter && filter.brands"> / {{ filter.brands.name }} </span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('price') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].price" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('discount_percent') }}</label>
						<input class="form-control" type="number" v-model="discountPercent" @change="changePercent" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].discount" @change="change" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('manpower') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].man_power" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('final_price') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].final_price" disabled />
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
		props: { index: Number, form: Object, dimension: Object },
		i18n: { messages },
		data() {
			return {
				filters: [],
				show: false,
				discountPercent: 0,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getFiltersByDimension(this.dimension, (result) => {
					this.filters = {}
					for (const i in result.data) {
						this.filters[result.data[i].equipment_id] = result.data[i]
					}
					this.change()
					this.setData()
					this.show = true
				})
			},
			change() {
				this.setData()
				this.$emit('changed')
				// if (this.filters[this.value]) {
				// 	this.setData()
				// 	const data = {
				// 		id: this.value,
				// 		type: 'filters',
				// 		index: this.equipment.index,
				// 		engine: {
				// 			id: this.filters[this.value].engines.id,
				// 			equipment_id: this.filters[this.value].engines.equipment_id,
				// 		},
				// 		lid: {
				// 			id: this.filters[this.value].lids.id,
				// 			equipment_id: this.filters[this.value].lids.equipment_id,
				// 		},
				// 		equipment_id: this.filters[this.value].equipment_id,
				// 		discount: this.discountValue,
				// 		price: this.price,
				// 		final_price: this.final_price,
				// 	}
				// 	this.$emit('changed', data)
				// }
			},
			changePercent() {
				const price = this.form.equipments[this.index].price
				const price_with_discount = isNaN(price) ? 0 : price + (price * (isNaN(this.discountPercent) ? 0 : this.discountPercent)) / 100
				this.form.equipments[this.index].discount = price_with_discount - price
				this.setData()
				this.change()
			},
			setData() {
				const id = this.form.equipments[this.index].equipment_id
				if (this.filters[id] && this.filters[id].equipments) {
					const profit_margin = parseFloat(this.filters[id].equipments.profit_margin)
					const cost = parseFloat(this.filters[id].equipments.cost)
					const price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					const discount = parseFloat(this.form.equipments[this.index].discount)
					const price_with_discount = price

					const man_power_profit_margin = parseFloat(this.filters[id].equipments.man_power_profit_margin)
					const man_power_cost = parseFloat(this.filters[id].equipments.man_power_cost)
					const man_power_price = isNaN(man_power_cost) ? 0 : man_power_cost + (man_power_cost * (isNaN(man_power_profit_margin) ? 0 : man_power_profit_margin)) / 100

					this.form.equipments[this.index].cost = cost
					this.form.equipments[this.index].profit_margin = profit_margin
					this.form.equipments[this.index].price = price_with_discount
					this.form.equipments[this.index].final_price = price_with_discount + (isNaN(man_power_price) ? 0 : man_power_price) - (isNaN(discount) ? 0 : discount)
					this.form.equipments[this.index].man_power = man_power_price
					this.show = false
					setTimeout(() => {
						this.show = true
					})
				}
			},
		},
	}
</script>
