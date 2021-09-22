<template>
	<div class="home">
		<Form @save="save">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row">
				<div class="col-sm-6" v-if="this.form.id">
					<div class="form-group">
						<label for="id">{{ $t('id') }}</label>
						<input class="form-control" id="id" v-model="form.id" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.name" type="text" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="provider">{{ $t('provider') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="provider" v-model="form.provider_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="provider.id" v-for="(provider, i) in this.providers" :key="i">
									{{ provider.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="brand">{{ $t('brand') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="brand" v-model="form.brand_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="brand.id" v-for="(brand, i) in this.brands" :key="i">
									{{ brand.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="cost">{{ $t('cost') }}</label>
						<input class="form-control" id="cost" v-model="form.cost" type="number" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="profit_margin">{{ $t('profit_margin') }}</label>
						<input class="form-control" id="profit_margin" v-model="form.profit_margin" type="number" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="man_power_cost">{{ $t('man_power_cost') }}</label>
						<input class="form-control" id="man_power_cost" v-model="form.man_power_cost" type="number" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="man_power_profit_margin">{{ $t('man_power_profit_margin') }}</label>
						<input class="form-control" id="man_power_profit_margin" v-model="form.man_power_profit_margin" type="number" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="sand_kg">{{ $t('sand_kg') }}</label>
						<input class="form-control" id="sand_kg" v-model="form.sand_kg" type="number" />
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import MessageError from '../../../../helpers/messages-errors'
	import Methods from '../../../../helpers/methods'

	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Sands from '../../../../controllers/equipments/sands'
	import Providers from '../../../../controllers/basics/providers'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'SandForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				providers: [],
				brands: [],
				sands: [],
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id && this.id != 0) {
					Sands.get(this.id, (sand) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: sand.data.equipments ? sand.data.equipments.name : '',
							provider_id: sand.data.providers.id,
							brand_id: sand.data.brands.id,
							cost: sand.data.equipments ? sand.data.equipments.cost : '',
							profit_margin: sand.data.equipments ? sand.data.equipments.profit_margin : '',
							cash_price: sand.data.equipments ? sand.data.equipments.cash_price : '',
							forward_price: sand.data.equipments ? sand.data.equipments.forward_price : '',
							man_power_cost: sand.data.equipments ? sand.data.equipments.man_power_cost : '',
							man_power_profit_margin: sand.data.equipments ? sand.data.equipments.man_power_profit_margin : '',
						}
					})
				}
				Providers.list((providers) => {
					this.providers = providers.data
					Brands.list((brands) => {
						this.brands = brands.data
					})
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Sands.update(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title', 'sands')
					})
				} else {
					Sands.insert(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
						if (result.data) {
							Methods.refreshPage(this, 'sands/' + result.data.id, true)
						}
					})
				}
			},
		},
	}
</script>
