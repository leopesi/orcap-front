<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('blankets') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label for="blanket">{{ $t('blanket') }}</label>
						<select class="custom-select" id="blanket" v-model="form.blanket" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="blanket.id" v-for="(blanket, i) in this.blankets" :key="i">
								<span v-if="blanket && blanket.equipments && blanket.brands">
									{{ blanket.equipments.name }} / {{ blanket.brands.name }}
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
			<div class="row" v-if="this.see_more">
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
		name: 'Blankets',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				blankets: [],
				discount: 0,
				description: '',
				cash_price: 0,
				forward_price: 0,
				cash_price_total: 0,
				forward_price_total: 0,
				see_more: false
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getBlanketsByDimension(this.form.dimension, (result) => {
					this.blankets = {}
					for (const i in result.data) {
						this.blankets[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.blankets[this.form.blanket]) {
					this.description = this.blankets[this.form.blanket].equipments.description
					this.cash_price = this.blankets[this.form.blanket].equipments.cash_price
					this.forward_price = this.blankets[this.form.blanket].equipments.forward_price

					this.cash_price_total = this.blankets[this.form.blanket].equipments.cash_price * this.form.m2_facial
					this.forward_price_total = this.blankets[this.form.blanket].equipments.forward_price * this.form.m2_facial
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['blanket'] = {
						cash_price: this.blankets[this.form.blanket].equipments.cash_price * this.form.m2_facial,
						forward_price: this.blankets[this.form.blanket].equipments.forward_price * this.form.m2_facial,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
