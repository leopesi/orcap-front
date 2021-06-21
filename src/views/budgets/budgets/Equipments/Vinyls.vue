<template>
	<div class="card">
		<!-- <div class="card-header">
			{{ $t('vinyls') }}
		</div> -->
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
						<label for="vinyl">{{ $t('vinyl') }}</label>
						<select class="custom-select" id="vinyl" v-model="value" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="vinyl.id" v-for="(vinyl, i) in this.vinyls" :key="i">
								<span v-if="vinyl && vinyl.equipments">
									{{ vinyl.equipments.name }}
								</span>
								<span v-if="vinyl && vinyl.brands">
									/ {{ vinyl.brands.name }}
								</span>
							</option>
						</select>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="discount">{{ $t('discount') }}</label>
						<input class="form-control" id="discount" type="number" v-model="discount"  @change="change"/>
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
		name: 'Vinyls',
		props: { id: String, discount: String, equipment: Object },
		i18n: { messages },
		data() {
			return {
				vinyls: [],
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
				})
			},
			change() {
				if (this.vinyls[this.value]) {
					const data = {
						id: this.value,
						type: 'vinyls',
						index: this.equipment.index,
						equipment_id: this.vinyls[this.value].equipments.id,
						discount: this.discount
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
