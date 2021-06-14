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
						<label for="cash_price">{{ $t('cash_price') }}</label>
						<input class="form-control" id="cash_price" v-model="form.cash_price" type="number" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="forward_price">{{ $t('forward_price') }}</label>
						<input class="form-control" id="forward_price" v-model="form.forward_price" type="number" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="size">{{ $t('size') }}</label>
						<input class="form-control" id="size" v-model="form.size" type="number" />
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
	import Profiles from '../../../../controllers/equipments/profiles'
	import Providers from '../../../../controllers/basics/providers'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'ProfileForm',
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
					Profiles.get(this.id, (profile) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: profile.data.equipments ? profile.data.equipments.name : '',
							provider_id: profile.data.providers.id,
							brand_id: profile.data.brands.id,
							cost: profile.data.equipments ? profile.data.equipments.cost : '',
							profit_margin: profile.data.equipments ? profile.data.equipments.profit_margin : '',
							cash_price: profile.data.equipments ? profile.data.equipments.cash_price : '',
							forward_price: profile.data.equipments ? profile.data.equipments.forward_price : '',
							size: profile.data.size,
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
					Profiles.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Perfil',
							message: result.status,
						}
					})
				} else {
					Profiles.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Perfil',
							message: result.status,
						}
						this.id = result.data.id
						this.form.id = result.data.id
						window.location.hash = 'profiles/' + result.data.id
					})
				}
			},
		},
	}
</script>
