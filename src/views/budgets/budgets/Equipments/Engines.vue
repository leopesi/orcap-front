<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label for="engine">{{ $t('engine') }}</label>
						<select class="custom-select" id="engine" v-model="value" @change="change">
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
						<label for="discount">{{ $t('discount') }}</label>
						<input class="form-control" id="discount" type="number" :value="this.discount" />
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="description">{{ $t('description') }}</label>
						<input class="form-control" id="description" type="text" :value="this.description" disabled />
					</div>
				</div>
			</div>
			<div class="row" v-if="this.see_more">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="cash_price">{{ $t('cash_price') }}</label>
						<input class="form-control" id="cash_price" type="text" :value="this.cash_price" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="forward_price">{{ $t('forward_price') }}</label>
						<input class="form-control" id="forward_price" type="text" :value="this.forward_price" disabled />
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
		props: { id: String, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				engines: [],
				discount: 0,
				description: '',
				cash_price: 0,
				forward_price: 0,
				see_more: false,
				value: this.id,
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
						index: this.equipment.index,
						equipment_id: this.engines[this.value].equipments.id
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
