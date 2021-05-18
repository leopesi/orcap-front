<template>
	<div class="card" v-if="this.form">
		<div class="card-header">
			{{ $t('engines') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="engine">{{ $t('engine') }}</label>
						<select class="custom-select" id="engine" v-model="form.engine" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="engine.id" v-for="(engine, i) in this.engines" :key="i">
								{{ engine.equipments.name }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="description">{{ $t('description') }}</label>
						<input class="form-control" id="description" type="text" :value="this.description" disabled />
					</div>
				</div>
			</div>
			<div class="row">
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
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				engines: [],
				description: '',
				cash_price: 0,
				forward_price: 0,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getEnginesByDimension(this.form.dimension, (result) => {
					this.engines = {}
					for (const i in result.data) {
						this.engines[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.engines[this.form.engine]) {
					this.description = this.engines[this.form.engine].equipments.description
					this.cash_price = this.engines[this.form.engine].equipments.cash_price
					this.forward_price = this.engines[this.form.engine].equipments.forward_price
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['engine'] = {
						cash_price: this.engines[this.form.engine].equipments.cash_price,
						forward_price: this.engines[this.form.engine].equipments.forward_price,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
