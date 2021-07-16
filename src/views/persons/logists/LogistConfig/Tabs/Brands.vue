<template>
	<div class="home">
		<Form @save="save" v-if="this.token && this.form">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="brand_filter_id">{{ $t('brand_filter_id') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="brand_filter_id" v-model="form.brand_filter_id">
								{{
									this.brands
								}}
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
							<select class="form-control custom-select" id="brand_blanket_id" v-model="form.brand_blanket_id">
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
							<select class="form-control custom-select" id="brand_profile_id" v-model="form.brand_profile_id">
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
							<select class="form-control custom-select" id="brand_vinyl_id" v-model="form.brand_vinyl_id">
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
						<label for="debit_card">{{ $t('debit_card') }}</label>
						<input class="form-control" id="debit_card" v-model="form.debit_card" type="number" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="max_discount">{{ $t('max_discount') }}</label>
						<input class="form-control" id="max_discount" v-model="form.max_discount" type="number" />
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Form from '../../../../components/Form/Form'
	import Alert from '../../../../components/Alert/Alert.vue'
	import Logists from '../../../../../controllers/persons/logists'

	import messages from '../messages'
	export default {
		name: 'Brands',
		props: { token: String, form: Object, brands: Array },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				alert: {},
			}
		},
		mounted() {},
		methods: {
			save() {
				Logists.update(this.form, (result) => {
					this.alert = {
						title: 'Alteração dos Meus Dados',
						message: result.status,
					}
				})
			},
		},
	}
</script>
