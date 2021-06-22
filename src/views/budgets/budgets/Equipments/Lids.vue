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
								<span v-if="lid && lid.brands">
									/ {{ lid.brands.name }}
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
		name: 'Lids',
		props: { id: String, discount: String, dimension: Object, equipment: Object },
		i18n: { messages },
		data() {
			return {
				lids: [],
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
				})
			},
			change() {
				if (this.lids[this.value]) {
					const data = {
						id: this.value,
						type: 'lids',
						index: this.equipment.index,
						equipment_id: this.lids[this.value].equipments.id,
						discount: this.discountValue
					}
					this.$emit('changed', data)
				}
			},
		},
	}
</script>
