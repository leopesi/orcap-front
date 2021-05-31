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
							<select class="custom-select" id="provider" v-model="form.provider_id">
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
							<select class="custom-select" id="brand" v-model="form.brand_id">
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
							<select class="custom-select" id="engine" v-model="form.engine_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="engine.id" v-for="(engine, i) in this.engines" :key="i">
									{{ engine.equipments.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="lid">{{ $t('lid') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="lid" v-model="form.lid_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="lid.id" v-for="(lid, i) in this.lids" :key="i">
									{{ lid.equipments.name }}
								</option>
							</select>
						</div>
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
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Filters from '../../../../controllers/equipments/filters'
	import Engines from '../../../../controllers/equipments/engines'
	import Lids from '../../../../controllers/equipments/lids'
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
							})
						})
					})
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Filters.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Filtro',
							message: result.status,
						}
					})
				} else {
					Filters.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Filtro',
							message: result.status,
						}
						this.id = result.data.id
						this.form.id = result.data.id
						window.location.hash = 'filters/' + result.data.id
					})
				}
			},
		},
	}
</script>
