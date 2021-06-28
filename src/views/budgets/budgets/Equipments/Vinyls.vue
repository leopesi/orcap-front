<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('vinyls') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-9">
					<div class="form-group">
						<label>{{ $t('vinyl') }}</label>
						<select class="custom-select" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="vinyl.id" v-for="(vinyl, i) in this.vinyls" :key="i">
								<span v-if="vinyl && vinyl.equipments">
									{{ vinyl.equipments.name }}
								</span>
								<span v-if="vinyl && vinyl.brands"> / {{ vinyl.brands.name }} </span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('price') }}</label>
						<input class="form-control" type="number" :value="this.price.toFixed(2)" disabled />
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
						<input class="form-control" type="number" v-model="discountValue" @change="change" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('manpower') }}</label>
						<input class="form-control" type="number" :value="this.man_power.toFixed(2)" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>{{ $t('final_price') }}</label>
						<input class="form-control" type="number" :value="this.final_price.toFixed(2)" disabled />
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
		name: 'Vinyls',
		props: { id: String, discount: Number, equipment: Object },
		i18n: { messages },
		data() {
			return {
				vinyls: [],
				description: '',
				price: 0,
				final_price: 0,
				man_power: 0,
				value: this.id,
				discountValue: this.discount,
				discountPercent: 0,
			}
		},
		mounted() {
			this.load()
		},
		watch: {
			id(to) {
				this.value = to
				this.setData()
			},
		},
		methods: {
			load() {
				Equipments.getVinylsByDimension(this.dimension, (result) => {
					this.vinyls = {}
					for (const i in result.data) {
						const id = result.data[i].id
						this.vinyls[id] = result.data[i]
						if (this.vinyls[id].equipment_id == this.equipment.equipment_id) {
							this.value = id
						}
					}
					this.change()
					this.setData()
				})
			},
			change() {
				if (this.vinyls[this.value]) {
					this.setData()
					const data = {
						id: this.value,
						type: 'vinyls',
						index: this.equipment.index,
						equipment_id: this.vinyls[this.value].equipments.id,
						discount: this.discountValue,
					}
					this.$emit('changed', data)
				}
			},
			changePercent() {
				if (this.vinyls[this.value] && this.vinyls[this.value].equipments) {
					const profit_margin = parseFloat(this.vinyls[this.value].equipments.profit_margin)
					const cost = parseFloat(this.vinyls[this.value].equipments.cost)
					const price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					const price_with_discount = isNaN(price) ? 0 : price + (price * (isNaN(this.discountPercent) ? 0 : this.discountPercent)) / 100
					this.discountValue = price_with_discount - price
					this.discount = price_with_discount - price
					this.setData()
					this.change()
				}
			},
			setData() {
				if (this.vinyls[this.value] && this.vinyls[this.value].equipments) {
					const profit_margin = parseFloat(this.vinyls[this.value].equipments.profit_margin)
					const cost = parseFloat(this.vinyls[this.value].equipments.cost)
					this.price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					this.final_price = this.price - (isNaN(this.discountValue) ? 0 : this.discountValue)

					const man_power_profit_margin = parseFloat(this.vinyls[this.value].equipments.man_power_profit_margin)
					const man_power_cost = parseFloat(this.vinyls[this.value].equipments.man_power_cost)
					const man_power_price = isNaN(man_power_cost) ? 0 : man_power_cost + (man_power_cost * (isNaN(man_power_profit_margin) ? 0 : man_power_profit_margin)) / 100
					this.final_price = this.final_price + (isNaN(man_power_price) ? 0 : man_power_price)
					this.man_power = man_power_price
				}
			},
		},
	}
</script>
