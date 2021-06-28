<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('lids') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('lid') }}</label>
						<select class="custom-select" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="lid.id" v-for="(lid, i) in this.lids" :key="i">
								<span v-if="lid && lid.equipments">
									{{ lid.equipments.name }}
								</span>
								<span v-if="lid && lid.brands"> / {{ lid.brands.name }} </span>
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
		name: 'Lids',
		props: { id: String, discount: Number, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				lids: [],
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
				Equipments.getLidsByFilters(this.dimension, (result) => {
					this.lids = {}
					for (const i in result.data) {
						const id = result.data[i].id
						this.lids[id] = result.data[i]
						if (this.lids[id].equipment_id == this.equipment.equipment_id) {
							this.value = id
						}
					}
					this.change()
					this.setData()
				})
			},
			change() {
				if (this.lids[this.value]) {
					this.setData()
					const data = {
						id: this.value,
						type: 'lids',
						index: this.equipment.index,
						equipment_id: this.lids[this.value].equipments.id,
						discount: this.discountValue,
					}
					this.$emit('changed', data)
				}
			},
			changePercent() {
				if (this.lids[this.value] && this.lids[this.value].equipments) {
					const profit_margin = parseFloat(this.lids[this.value].equipments.profit_margin)
					const cost = parseFloat(this.lids[this.value].equipments.cost)
					const price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					const price_with_discount = isNaN(price) ? 0 : price + (price * (isNaN(this.discountPercent) ? 0 : this.discountPercent)) / 100
					this.discountValue = price_with_discount - price
					this.setData()
					this.change()
				}
			},
			setData() {
				if (this.lids[this.value] && this.lids[this.value].equipments) {
					const profit_margin = parseFloat(this.lids[this.value].equipments.profit_margin)
					const cost = parseFloat(this.lids[this.value].equipments.cost)
					this.price = isNaN(cost) ? 0 : cost + (cost * (isNaN(profit_margin) ? 0 : profit_margin)) / 100
					this.final_price = this.price - (isNaN(this.discountValue) ? 0 : this.discountValue)
				}
			},
		},
	}
</script>
