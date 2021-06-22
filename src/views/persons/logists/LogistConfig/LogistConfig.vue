<template>
	<div class="home">
		<Form @save="save" :size="'medium'" v-if="this.token">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="brand_filter_id">{{ $t('brand_filter_id') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="brand_filter_id" v-model="form.brand_filter_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="brand.id" v-for="(brand, i) in this.brands" :key="i">
									{{ brand.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="brand_blanket_id">{{ $t('brand_blanket_id') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="brand_blanket_id" v-model="form.brand_blanket_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
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
					<div class="form-group mb-3">
						<label for="brand_profile_id">{{ $t('brand_profile_id') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="brand_profile_id" v-model="form.brand_profile_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="brand.id" v-for="(brand, i) in this.brands" :key="i">
									{{ brand.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="brand_vinyl_id">{{ $t('brand_vinyl_id') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="brand_vinyl_id" v-model="form.brand_vinyl_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="brand.id" v-for="(brand, i) in this.brands" :key="i">
									{{ brand.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Global from '../../../../helpers/global'
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Logists from '../../../../controllers/persons/logists'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'LogistForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					brand_filter_id: null,
					brand_blanket_id: null,
					brand_profile_id: null,
					brand_vinyl_id: null,
				},
				token: localStorage.token,
				brands: {},
				alert: {},
			}
		},
		mounted() {
			this.token = localStorage.token
			this.load()
		},
		methods: {
			load() {
				Brands.list((brands) => {
					Logists.getByToken((result) => {
						this.form = {
							id: result.data.id,
							brand_filter_id: result.data.brand_filter_id,
							brand_blanket_id: result.data.brand_blanket_id,
							brand_profile_id: result.data.brand_profile_id,
							brand_vinyl_id: result.data.brand_vinyl_id,
						}

						this.brands = brands.data
					})
				})
			},
			save() {
				Logists.update(this.form, (result) => {
					this.alert = {
						title: 'Alteração dos Meus Dados',
						message: result.status,
					}
					localStorage.userName = result.data.name
					Global.$emit('change-header-name', result.data.name)
				})
			},
		},
	}
</script>
