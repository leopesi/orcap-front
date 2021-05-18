<template>
	<div class="card" v-if="this.form">
		<div class="card-header">
			{{ $t('lids') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="lid">{{ $t('lid') }}</label>
						<select class="custom-select" id="lid" v-model="form.lid" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="lid.id" v-for="(lid, i) in this.lids" :key="i">
								{{ lid.equipments.name }}
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
		name: 'Lids',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				lids: [],
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
				Equipments.getLidsByFilters(this.form.dimension, (result) => {
					this.lids = {}
					for (const i in result.data) {
						this.lids[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.lids[this.form.lid]) {
					this.description = this.lids[this.form.lid].equipments.description
					this.cash_price = this.lids[this.form.lid].equipments.cash_price
					this.forward_price = this.lids[this.form.lid].equipments.forward_price
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['lid'] = {
						cash_price: this.lids[this.form.lid].equipments.cash_price,
						forward_price: this.lids[this.form.lid].equipments.forward_price,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
