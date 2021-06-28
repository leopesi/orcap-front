<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('profiles') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('profile') }}</label>
						<select class="custom-select" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="profile.id" v-for="(profile, i) in this.profiles" :key="i">
								<span v-if="profile && profile.equipments">
									{{ profile.equipments.name }}
								</span>
								<span v-if="profile && profile.brands"> / {{ profile.brands.name }} </span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('final_price') }}</label>
						<input class="form-control" type="number" :value="this.final_price.toFixed(2)" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('discount_percent') }}</label>
						<input class="form-control" type="number" v-model="discountPercent" @change="changePercent" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="discountValue" @change="change" />
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
		name: 'Profiles',
		props: { id: String, discount: Number, equipment: Object },
		i18n: { messages },
		data() {
			return {
				profiles: [],
				description: '',
				price: 0,
				final_price: 0,
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
				Equipments.getProfilesByDimension(this.dimension, (result) => {
					this.profiles = {}
					for (const i in result.data) {
						const id = result.data[i].id
						this.profiles[id] = result.data[i]
						if (this.profiles[id].equipment_id == this.equipment.equipment_id) {
							this.value = id
						}
					}
					this.change()
					this.setData()
				})
			},
			change() {
				if (this.profiles[this.value]) {
					this.setData()
					const data = {
						id: this.value,
						type: 'profiles',
						index: this.equipment.index,
						equipment_id: this.profiles[this.value].equipments.id,
						discount: this.discountValue,
					}
					this.$emit('changed', data)
				}
			},
			changePercent() {
				if (this.profiles[this.value] && this.profiles[this.value].equipments) {
					const profit_margin = parseFloat(this.profiles[this.value].equipments.profit_margin)
					const cost = parseFloat(this.profiles[this.value].equipments.cost)
					const price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					const price_with_discount = isNaN(price) ? 0 : price + (price * (isNaN(this.discountPercent) ? 0 : this.discountPercent)) / 100
					this.discountValue = price_with_discount - price
					this.setData()
					this.change()
				}
			},
			setData() {
				if (this.profiles[this.value] && this.profiles[this.value].equipments) {
					const profit_margin = parseFloat(this.profiles[this.value].equipments.profit_margin)
					const cost = parseFloat(this.profiles[this.value].equipments.cost)
					this.price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					this.final_price = this.price - (isNaN(this.discountValue) ? 0 : this.discountValue)
				}
			},
		},
	}
</script>
