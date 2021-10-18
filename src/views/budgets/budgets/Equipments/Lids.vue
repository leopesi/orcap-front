<template>
	<div class="card" v-if="this.show && this.form.equipments[this.index]">
		<div class="card-header">
			<div class="row">
				<div class="col-sm-11">
					{{ $t('lid') }}
				</div>
				<div class="btn col-sm-1 text-right" @click="$emit('delete')">
					X
				</div>
			</div>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<select class="form-control custom-select" v-model="form.equipments[index].equipment_id" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="lid.equipment_id" v-for="(lid, i) in this.lids" :key="i">
								<span v-if="lid && lid.equipments">
									{{ lid.equipments.name }}
								</span>
								<span v-if="lid && lid.brands"> / {{ lid.brands.name }} </span>
								<span v-if="lid && lid.providers"> / {{ lid.providers.name }} </span>
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount_percent') }}</label>
						<input class="form-control" type="number" v-model="discountPercent" @change="changePercent" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].discount" @change="change" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('price') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].price" disabled />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('manpower') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].man_power" disabled />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('final_price') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].final_price" disabled />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('forward_price') }}</label>
						<input class="form-control" type="number" v-model="forward_price" disabled />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import Equipments from '../../../../controllers/budgets/equipments'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Lids',
		props: { index: Number, form: Object, tax: Number },
		i18n: { messages },
		data() {
			return {
				lids: [],
				forward_price: 0,
				show: false,
				discountPercent: 0,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getLidsByFilters((result) => {
					this.lids = {}
					for (const i in result.data) {
						this.lids[result.data[i].equipment_id] = result.data[i]
					}
					this.change()
					this.setData()
					this.show = true
				})
			},
			change() {
				this.setData()
				this.$emit('changed')
			},
			changePercent() {
				const price = Methods.fixNumber(this.form.equipments[this.index].price)
				const price_with_discount = price + (price * Methods.fixNumber(this.discountPercent)) / 100
				this.form.equipments[this.index].discount = price_with_discount - price
				this.setData()
				this.change()
			},
			setData() {
				if (this.form.equipments[this.index] && this.form.equipments[this.index].equipment_id) {
					const id = this.form.equipments[this.index].equipment_id
					if (this.lids[id] && this.lids[id].equipments) {
						const profit_margin = Methods.fixNumber(this.lids[id].equipments.profit_margin)
						const cost = Methods.fixNumber(this.lids[id].equipments.cost)
						const price = cost + (cost * profit_margin) / 100
						const discount = Methods.fixNumber(this.form.equipments[this.index].discount)
						const price_with_discount = price

						const man_power_profit_margin = Methods.fixNumber(this.lids[id].equipments.man_power_profit_margin)
						const man_power_cost = Methods.fixNumber(this.lids[id].equipments.man_power_cost)
						const man_power_price = man_power_cost + (man_power_cost * man_power_profit_margin) / 100

						this.form.equipments[this.index].cost = cost
						this.form.equipments[this.index].profit_margin = profit_margin
						this.form.equipments[this.index].price = price_with_discount
						this.form.equipments[this.index].final_price = price_with_discount + man_power_price - discount
						this.form.equipments[this.index].man_power = man_power_price

						this.forward_price = (this.form.equipments[this.index].final_price + (this.form.equipments[this.index].final_price * this.tax) / 100).toFixed(2)
						this.show = false
						setTimeout(() => {
							this.show = true
						})
					}
				}
			},
		},
	}
</script>
