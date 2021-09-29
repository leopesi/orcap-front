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
						<label for="engine">{{ $t('engine') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="engine" v-model="form.engine_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="engine.id" v-for="(engine, i) in this.engines" :key="i">
									<span v-if="engine.equipments && engine.brands"> {{ engine.equipments.name }} / {{ engine.brands.name }} </span>
									<span v-else> {{ engine.equipments.name }} </span>
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="lid">{{ $t('lid') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="lid" v-model="form.lid_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="lid.id" v-for="(lid, i) in this.lids" :key="i">
									<span v-if="lid.equipments && lid.brands"> {{ lid.equipments.name }} / {{ lid.brands.name }} </span>
									<span v-else> {{ lid.equipments.name }} </span>
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="sand">{{ $t('sand') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="sand" v-model="form.sand_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="sand.id" v-for="(sand, i) in this.sands" :key="i">
									<span v-if="sand.equipments && sand.brands"> {{ sand.equipments.name }} / {{ sand.brands.name }} </span>
									<span v-else> {{ sand.equipments.name }} </span>
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="sand_kg">{{ $t('sand_kg') }}</label>
						<input class="form-control" id="sand_kg" v-model="form.sand_kg" type="number" />
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
						<label for="max_capacity">{{ $t('max_capacity') }}</label>
						<input class="form-control" id="max_capacity" v-model="form.max_capacity" type="number" />
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
	import Filters from '../../../../controllers/equipments/filters'
	import Engines from '../../../../controllers/equipments/engines'
	import Lids from '../../../../controllers/equipments/lids'
	import Sands from '../../../../controllers/equipments/sands'
	import Providers from '../../../../controllers/basics/providers'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'FilterForm',
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
				engines: [],
				lids: [],
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
					Filters.get(this.id, (filter) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: filter.data.equipments ? filter.data.equipments.name : '',
							provider_id: filter.data.providers.id,
							brand_id: filter.data.brands.id,
							engine_id: filter.data.engine_id,
							lid_id: filter.data.lid_id,
							sand_id: filter.data.sand_id,
							sand_kg: filter.data.sand_kg,
							cost: filter.data.equipments ? filter.data.equipments.cost : '',
							profit_margin: filter.data.equipments ? filter.data.equipments.profit_margin : '',
							cash_price: filter.data.equipments ? filter.data.equipments.cash_price : '',
							forward_price: filter.data.equipments ? filter.data.equipments.forward_price : '',
							man_power_cost: filter.data.equipments ? filter.data.equipments.man_power_cost : '',
							man_power_profit_margin: filter.data.equipments ? filter.data.equipments.man_power_profit_margin : '',
							max_capacity: filter.data.max_capacity,
						}
					})
				}
				Providers.list((providers) => {
					this.providers = providers.data
					Brands.list((brands) => {
						this.brands = brands.data
						Engines.list((engines) => {
							this.engines = engines.data
							Lids.list((lids) => {
								this.lids = lids.data
								Sands.list((sands) => {
									this.sands = sands.data
								})
							})
						})
					})
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Filters.update(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title', 'filters')
					})
				} else {
					Filters.insert(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
						if (result.data) {
							Methods.refreshPage(this, 'filters/' + result.data.id, true)
						}
					})
				}
			},
		},
	}
</script>
