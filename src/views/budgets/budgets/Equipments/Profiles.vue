<template>
	<div class="card" v-if="this.show">
		<div class="card-header">
			<div class="row">
				<div class="col-sm-11">
					{{ $t('profile') }}
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
							<option :value="profile.equipment_id" v-for="(profile, i) in this.profiles" :key="i">
								<span v-if="profile && profile.equipments">
									{{ profile.equipments.name }}
								</span>
								<span v-if="profile && profile.brands"> / {{ profile.brands.name }} </span>
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
		name: 'Profiles',
		props: { index: Number, logist: Object, form: Object, perimeter: Number, tax: Number },
		i18n: { messages },
		data() {
			return {
				profiles: [],
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
				Equipments.getProfilesByLogist((result) => {
					this.profiles = {}
					for (const i in result.data) {
						this.profiles[result.data[i].equipment_id] = result.data[i]
					}
					if (!this.form.equipments[this.index].equipment_id) {
						for (const i in this.profiles) {
							if (this.profiles[i].equipments.brand_id == this.logist.brand_profile_id){
								this.form.equipments[this.index].equipment_id = this.profiles[i].equipment_id
							}
						}
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
				const id = this.form.equipments[this.index].equipment_id
				if (this.profiles[id] && this.profiles[id].equipments) {
					const profit_margin = Methods.fixNumber(this.profiles[id].equipments.profit_margin)
					const cost = Methods.fixNumber(this.profiles[id].equipments.cost)
					const price = cost + (cost * profit_margin) / 100
					const discount = Methods.fixNumber(this.form.equipments[this.index].discount)
					const price_with_discount = price

					const man_power_profit_margin = Methods.fixNumber(this.profiles[id].equipments.man_power_profit_margin)
					const man_power_cost = Methods.fixNumber(this.profiles[id].equipments.man_power_cost)
					const man_power_price = man_power_cost + (man_power_cost * man_power_profit_margin) / 100

					this.form.equipments[this.index].cost = cost
					this.form.equipments[this.index].profit_margin = profit_margin
					this.form.equipments[this.index].price = price_with_discount
					this.form.equipments[this.index].final_price = price_with_discount * this.perimeter + man_power_price - discount
					this.form.equipments[this.index].man_power = man_power_price

					this.forward_price = (this.form.equipments[this.index].final_price + (this.form.equipments[this.index].final_price * this.tax) / 100).toFixed(2)
					this.show = false
					setTimeout(() => {
						this.show = true
					})
				}
			},
		},
	}
</script>
