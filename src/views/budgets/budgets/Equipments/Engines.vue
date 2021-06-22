<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label>{{ $t('engine') }}</label>
						<select class="custom-select" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="engine.id" v-for="(engine, i) in this.engines" :key="i">
								<span v-if="engine && engine.equipments">
									{{ engine.equipments.name }}
								</span>
								<span v-if="engine && engine.brands">
									/ {{ engine.brands.name }}
								</span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label>{{ $t('discount') }}</label>
						<input class="form-control" type="number" v-model="discountValue"  @change="change"/>
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
		name: 'Engines',
		props: { id: String, discount: String, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				engines: [],
				description: '',
				cash_price: 0,
				forward_price: 0,
				see_more: false,
				value: this.id,
				discountValue: this.discount
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
				Equipments.getEnginesByDimension(this.dimension, (result) => {
					this.engines = {}
					for (const i in result.data) {
						const id = result.data[i].id
						this.engines[id] = result.data[i]
						if (this.engines[id].equipment_id == this.equipment.equipment_id) {
							this.value = id
						}
					}
					this.change()
				})
			},
			change() {
				if (this.engines[this.value]) {
					const data = {
						id: this.value,
						type: 'engines',
						index: this.equipment.index,
						equipment_id: this.engines[this.value].equipments.id,
						discount: this.discountValue
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
