<template>
	<div class="home">
		<Form @save="save" v-if="this.token">
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
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="debit_card">{{ $t('debit_card') }}</label>
						<input class="form-control" id="debit_card" v-model="form.debit_card" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="max_discount">{{ $t('max_discount') }}</label>
						<input class="form-control" id="max_discount" v-model="form.max_discount" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<Card>
						<div class="card-header">
							{{ $t('installment_credit_card') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group mb-3">
										<label for="number_installment_credit_card">{{ $t('number_installments') }}</label>
										<input
											class="form-control"
											id="number_installment_credit_card"
											v-model="number_installment_credit_card"
											@keyup="installment_credit_card = changeInstallment($event, installment_credit_card)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<table class="table">
										<tr v-for="i in parseInt(installment_credit_card.length / 2)" :key="i">
											<td>
												{{ parseInt(i * 2) - 1 }}
											</td>
											<td>
												<input class="form-control" v-model="installment_credit_card[parseInt(i * 2) - 2]" />
											</td>
											<td>
												{{ parseInt(i * 2) }}
											</td>
											<td>
												<input class="form-control" v-model="installment_credit_card[parseInt(i * 2) - 1]" />
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12 pt-4">
					<Card>
						<div class="card-header">
							{{ $t('by_logist') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group mb-3">
										<label for="number_by_logist">{{ $t('number_installments') }}</label>
										<input
											class="form-control"
											id="number_by_logist"
											v-model="number_by_logist"
											@keyup="by_logist = changeInstallment($event, by_logist)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<table class="table">
										<tr v-for="i in parseInt(by_logist.length / 2)" :key="i">
											<td>
												{{ parseInt(i * 2) - 1 }}
											</td>
											<td>
												<input class="form-control" v-model="by_logist[parseInt(i * 2) - 2]" />
											</td>
											<td>
												{{ parseInt(i * 2) }}
											</td>
											<td>
												<input class="form-control" v-model="by_logist[parseInt(i * 2) - 1]" />
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12 pt-4">
					<Card>
						<div class="card-header">
							{{ $t('by_financial') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group mb-3">
										<label for="number_by_financial">{{ $t('number_installments') }}</label>
										<input
											class="form-control"
											id="number_by_financial"
											v-model="number_by_financial"
											@keyup="by_financial = changeInstallment($event, by_financial)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<table class="table">
										<tr v-for="i in parseInt(by_financial.length / 2)" :key="i">
											<td>
												{{ parseInt(i * 2) - 1 }}
											</td>
											<td>
												<input class="form-control" v-model="by_financial[parseInt(i * 2) - 2]" />
											</td>
											<td>
												{{ parseInt(i * 2) }}
											</td>
											<td>
												<input class="form-control" v-model="by_financial[parseInt(i * 2) - 1]" />
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Global from '../../../../helpers/global'
	import Form from '../../../components/Form/Form'
	import Card from '../../../components/Card/Card'
	import Alert from '../../../components/Alert/Alert'
	import Logists from '../../../../controllers/persons/logists'
	import Brands from '../../../../controllers/basics/brands'

	import messages from './messages'
	export default {
		name: 'LogistForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Card },
		data() {
			return {
				form: {
					brand_filter_id: null,
					brand_blanket_id: null,
					brand_profile_id: null,
					brand_vinyl_id: null,
				},
				number_installment_credit_card: 0,
				installment_credit_card: [],
				number_by_logist: 0,
				by_logist: [],
				number_by_financial: 0,
				by_financial: [],
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
						this.form = result.data
							
						this.installment_credit_card = JSON.parse(result.data.installment_credit_card)
						if (!this.installment_credit_card) this.installment_credit_card = []
						this.number_installment_credit_card = this.installment_credit_card.length

						this.by_logist = JSON.parse(result.data.by_logist)
						if (!this.by_logist) this.by_logist = []
						this.number_by_logist = this.by_logist.length

						this.by_financial = JSON.parse(result.data.by_financial)
						if (!this.by_financial) this.by_financial = []
						this.number_by_financial = this.by_financial.length

						this.brands = brands.data
					})
				})
			},
			save() {
				this.form.installment_credit_card = JSON.stringify(this.installment_credit_card)
				this.form.by_logist = JSON.stringify(this.by_logist)
				this.form.by_financial = JSON.stringify(this.by_financial)
				console.log(this.form.max_discount)
				Logists.update(this.form, (result) => {
					this.alert = {
						title: 'Alteração dos Meus Dados',
						message: result.status,
					}
					localStorage.userName = result.data.name
					Global.$emit('change-header-name', result.data.name)
				})
			},
			changeInstallment(e, installment) {
				installment = installment.slice(0, parseInt(e.target.value))
				console.log(installment)
				for (let i = 0; i < parseInt(e.target.value); i++) {
					if (i >= installment.length) {
						installment.push(0)
					}
				}
				return installment
			},
		},
	}
</script>
