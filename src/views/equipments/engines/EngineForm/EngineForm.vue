<template>
	<div class="home">
		<Form @save="save">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row">
				<div class="col-sm-6">
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
	import Engines from '../../../../controllers/equipments/engines'
	import Providers from '../../../../controllers/basics/providers'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'EngineForm',
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
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Engines.get(this.id, (filter) => {
					console.log(filter)
					this.form = {
						id: filter.data.id,
						name: filter.data.equipments ? filter.data.equipments.name : '',
						provider_id: filter.data.providers.id,
						brand_id: filter.data.brands.id,
						engine_id: filter.data.engine_id,
						lid_id: filter.data.lid_id,
						max_capacity: filter.data.max_capacity,
					}
					Providers.list((providers) => {
						this.providers = providers.data
						Brands.list((brands) => {
							this.brands = brands.data
						})
					})
				})
			},
			save() {
				if (this.form.id) {
					Engines.update(this.form, (result) => {
						console.log(result)
						this.alert = {
							title: 'Salvar Usuário',
							message: result.status,
						}
					})
				} else {
					Engines.insert(this.form, (result) => {
						console.log(result)
					})
				}
			},
		},
	}
</script>
