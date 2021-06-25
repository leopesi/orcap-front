<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('vinyls') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
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
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="discountValue" @change="change" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('description') }}</label>
						<input class="form-control" type="text" :value="this.description" disabled />
					</div>
				</div>
				<div class="col-sm-4">
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
		props: { id: String, discount: String, equipment: Object },
		i18n: { messages },
		data() {
			return {
				vinyls: [],
				description: '',
				price: 0,
				final_price: 0,
				value: this.id,
				discountValue: this.discount,
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
					const profit_margin = parseFloat(this.vinyls[this.value].profit_margin)
					const cost = parseFloat(this.vinyls[this.value].cost)
					this.price = isNaN(cost) ? 0 : cost * (1 + (isNaN(profit_margin) ? 0 : profit_margin))
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
			setData() {
				if (this.vinyls[this.value] && this.vinyls[this.value].equipments) {
					const profit_margin = parseFloat(this.vinyls[this.value].equipments.profit_margin)
					const cost = parseFloat(this.vinyls[this.value].equipments.cost)
					this.price = isNaN(cost) ? 0 : cost * (1 + (isNaN(profit_margin) ? 0 : profit_margin))
					this.final_price = this.price - (isNaN(this.discount) ? 0 : this.discount)
				}
			},
		},
	}
</script>
