<template>
	<div class="card" v-if="this.show">
		<div class="card-header">
			<div class="row">
				<div class="col-sm-11">
					{{ $t('supplies') }}
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
						<input class="form-control" v-model="form.equipments[index].text" @change="change" />
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
						<input class="form-control" type="number" v-model="form.equipments[index].price" @change="change" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('manpower') }}</label>
						<input class="form-control" type="number" v-model="form.equipments[index].man_power" @change="change" />
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
	import Equipments from '../../../../controllers/budgets/equipments'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Blankets',
		props: { index: Number, form: Object, tax: Number },
		i18n: { messages },
		data() {
			return {
				blankets: [],
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
				Equipments.getBlanketsByDimension(this.dimension, (result) => {
					this.blankets = {}
					for (const i in result.data) {
						this.blankets[result.data[i].equipment_id] = result.data[i]
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
				const price = this.form.equipments[this.index].price
				const price_with_discount = isNaN(price) ? 0 : price + (price * (isNaN(this.discountPercent) ? 0 : this.discountPercent)) / 100
				this.form.equipments[this.index].discount = price_with_discount - price
				this.setData()
				this.change()
			},
			setData() {
				const price = parseFloat(this.form.equipments[this.index].price)
				const discount = parseFloat(this.form.equipments[this.index].discount)
				const price_with_discount = isNaN(price) ? discount : isNaN(discount) ? price : price - discount
				const man_power = parseFloat(this.form.equipments[this.index].man_power)

				this.form.equipments[this.index].final_price = (isNaN(price_with_discount) ? 0 : price_with_discount) + (isNaN(man_power) ? 0 : man_power)
				this.forward_price = (this.form.equipments[this.index].final_price + (this.form.equipments[this.index].final_price * this.tax) / 100).toFixed(2)
				
				this.show = false
				setTimeout(() => {
					this.show = true
				})
			},
		},
	}
</script>
