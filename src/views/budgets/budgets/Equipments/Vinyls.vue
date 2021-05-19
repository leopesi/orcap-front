<template>
	<div class="card">
		<div class="card-header">
			{{ $t('vinyls') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="vinyl">{{ $t('vinyl') }}</label>
						<select class="custom-select" id="vinyl" v-model="form.vinyl" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="vinyl.id" v-for="(vinyl, i) in this.vinyls" :key="i">
								{{ vinyl.equipments.name }}
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
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="cash_price">{{ $t('cash_price') }} {{ $t('total') }}</label>
						<input class="form-control" id="cash_price" type="text" :value="this.cash_price_total" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="forward_price">{{ $t('forward_price') }} {{ $t('total') }}</label>
						<input class="form-control" id="forward_price" type="text" :value="this.forward_price_total" disabled />
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
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				vinyls: [],
				description: '',
				cash_price: 0,
				forward_price: 0,
				cash_price_total: 0,
				forward_price_total: 0,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getVinylsByDimension(this.form.dimension, (result) => {
					this.vinyls = {}
					for (const i in result.data) {
						this.vinyls[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.vinyls[this.form.vinyl]) {
					this.description = this.vinyls[this.form.vinyl].equipments.description
					this.cash_price = this.vinyls[this.form.vinyl].equipments.cash_price
					this.forward_price = this.vinyls[this.form.vinyl].equipments.forward_price
					this.cash_price_total = this.vinyls[this.form.vinyl].equipments.cash_price * this.form.m2_total
					this.forward_price_total = this.vinyls[this.form.vinyl].equipments.forward_price * this.form.m2_total
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['vinyl'] = {
						cash_price: this.vinyls[this.form.vinyl].equipments.cash_price * this.form.m2_total,
						forward_price: this.vinyls[this.form.vinyl].equipments.forward_price * this.form.m2_total,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
