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
						<select class="custom-select" id="blanket" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="blanket.id" v-for="(blanket, i) in this.blankets" :key="i">
								<span v-if="blanket && blanket.equipments">
									{{ blanket.equipments.name }}
								</span>
								<span v-if="blanket && blanket.brands">
									/ {{ blanket.brands.name }}
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
		props: { id: String, equipment: Object },
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
				Equipments.getBlanketsByDimension(this.dimension, (result) => {
					this.blankets = {}
					for (const i in result.data) {
						this.blankets[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.blankets[this.value]) {
					const data = {
						id: this.value,
						index: this.equipment.index,
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
