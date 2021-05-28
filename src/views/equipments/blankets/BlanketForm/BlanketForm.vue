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
						<label for="m2_size">{{ $t('m2_size') }}</label>
						<input class="form-control" id="m2_size" v-model="form.m2_size" type="number" />
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
	import Blankets from '../../../../controllers/equipments/blankets'
	import Providers from '../../../../controllers/basics/providers'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'BlanketForm',
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
				if (this.id && this.id != 0) {
					Blankets.get(this.id, (blanket) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: blanket.data.equipments ? blanket.data.equipments.name : '',
							provider_id: blanket.data.providers.id,
							brand_id: blanket.data.brands.id,
							m2_size: blanket.data.m2_size,
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
					Blankets.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Manta de Revestimento',
							message: result.status,
						}
					})
				} else {
					Blankets.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Manta de Revestimento',
							message: result.status,
						}
					})
				}
			},
		},
	}
</script>
