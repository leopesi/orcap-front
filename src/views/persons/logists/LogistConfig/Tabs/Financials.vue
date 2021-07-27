<template>
	<div class="home">
		<!-- <div class="card-header">
      {{ $t('man_power') }}
    </div> -->
		<Form @save="save" v-if="this.token && this.form">
			<!-- ****************** CARD ****************** -->
			<!-- Taxas de Cartão de crédito -->
			<div class="row pt-4">
				<div class="col-sm-12">
					<Card>
						<div class="card-header">
							{{ $t('installment_credit_card') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group mb-3">
										<label for="number_installment_credit_card">
											{{ $t('number_installments') }}
										</label>
										<input
											class="form-control"
											id="number_installment_credit_card"
											v-model="number_installment_credit_card"
											type="number"
											@keyup="installment_credit_card = changeInstallment($event, installment_credit_card)"
											@change="installment_credit_card = changeInstallment($event, installment_credit_card)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-sm-3" v-for="i in parseInt(installment_credit_card.length)" :key="i">
											<div class="row pb-4 align-items-center">
												<div class="col-sm-2 text-right px-0">
													<span class="">{{ parseInt(i) }}°</span>
												</div>
												<div class="col-sm-8">
													<input class="form-control" v-model="installment_credit_card[parseInt(i)]" type="number" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<!-- ****************** CARD ****************** -->
			<!-- Taxas de Parcelamento pela Loja -->
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
										<label for="number_by_logist">
											{{ $t('number_installments') }}
										</label>
										<input
											class="form-control"
											id="number_by_logist"
											type="number"
											v-model="number_by_logist"
											@keyup="by_logist = changeInstallment($event, by_logist)"
											@change="by_logist = changeInstallment($event, by_logist)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-sm-3" v-for="i in parseInt(by_logist.length)" :key="i">
											<div class="row pb-4 align-items-center">
												<div class="col-sm-2 text-right px-0">
													<span class="">{{ parseInt(i) }}°</span>
												</div>
												<div class="col-sm-8">
													<input class="form-control" v-model="by_logist[parseInt(i)]" type="number" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<!-- ****************** CARD ****************** -->
			<!-- Taxas de Parcelamento pela Financeira -->
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
										<label for="number_by_financial">
											{{ $t('number_installments') }}
										</label>
										<input
											class="form-control"
											id="number_by_financial"
											type="number"
											v-model="number_by_financial"
											@keyup="by_financial = changeInstallment($event, by_financial)"
											@change="by_financial = changeInstallment($event, by_financial)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-sm-3" v-for="i in parseInt(by_financial.length)" :key="i">
											<div class="row pb-4 align-items-center">
												<div class="col-sm-2 text-right px-0">
													<span class="">{{ parseInt(i) }}°</span>
												</div>
												<div class="col-sm-8">
													<input class="form-control" v-model="by_financial[parseInt(i)]" type="number" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>

			<!-- ****************** CARD ****************** -->
			<!-- Taxas pela Financeira com Entrada -->
			<div class="row">
				<div class="col-sm-12 pt-4">
					<Card>
						<div class="card-header">
							{{ $t('by_financial_down_payment') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group mb-3">
										<label for="number_by_financial_down_payment">
											{{ $t('number_installments') }}
										</label>
										<input
											class="form-control"
											id="number_by_financial_down_payment"
											type="number"
											v-model="number_by_financial_down_payment"
											@keyup="by_financial_down_payment = changeInstallment($event, by_financial_down_payment)"
											@change="by_financial_down_payment = changeInstallment($event, by_financial_down_payment)"
										/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<div class="row">
										<div class="col-sm-3" v-for="i in parseInt(by_financial_down_payment.length)" :key="i">
											<div class="row pb-4 align-items-center">
												<div class="col-sm-2 text-right px-0">
													<span class="">{{ parseInt(i) }}°</span>
												</div>
												<div class="col-sm-8">
													<input class="form-control" v-model="by_financial_down_payment[parseInt(i)]" type="number" />
												</div>
											</div>
										</div>
									</div>
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
	import Form from '../../../../components/Form/Form'
	import Alert from '../../../../components/Alert/Alert.vue'
	import Logists from '../../../../../controllers/persons/logists'
	import Card from '../../../../components/Card/Card.vue'

	import messages from '../messages'
	export default {
		name: 'Financials',
		props: { token: String, form: Object, brands: Array },
		i18n: { messages },
		components: { Form, Alert, Card },
		data() {
			return {
				alert: {},
				//Cartão de crédito*
				number_installment_credit_card: 0,
				installment_credit_card: [],

				//Parcelamento pela Loja**
				number_by_logist: 0,
				by_logist: [],

				//Parcelamento pela Financeira***
				number_by_financial: 0,
				by_financial: [],

				//Financeira com Entrada****
				number_by_financial_down_payment: 0,
				by_financial_down_payment: [],
			}
		},
		mounted() {
			this.token = localStorage.token
			this.load()
		},
		methods: {
			load() {
				Logists.getByToken((result) => {
					console.log(result.data)
					//Cartão de crédito*
					this.installment_credit_card = JSON.parse(result.data.installment_credit_card)
					if (!this.installment_credit_card) this.installment_credit_card = []
					this.number_installment_credit_card = this.installment_credit_card.length

					//Parcelamento pela Loja**
					this.by_logist = JSON.parse(result.data.by_logist)
					if (!this.by_logist) this.by_logist = []
					this.number_by_logist = this.by_logist.length

					//Parcelamento pela Financeira***
					this.by_financial = JSON.parse(result.data.by_financial)
					if (!this.by_financial) this.by_financial = []
					this.number_by_financial = this.by_financial.length

					//Financeira com Entrada****
					this.by_financial_down_payment = JSON.parse(result.data.by_financial_down_payment)
					if (!this.by_financial_down_payment) this.by_financial_down_payment = []
					this.number_by_financial_down_payment = this.by_financial_down_payment.length
				})
			},
			save() {
				this.form.installment_credit_card = JSON.stringify(this.installment_credit_card)
				this.form.by_logist = JSON.stringify(this.by_logist)
				this.form.by_financial = JSON.stringify(this.by_financial)
				this.form.by_financial_down_payment = JSON.stringify(this.by_financial_down_payment)
				Logists.update(this.form, (result) => {
					this.alert = {
						title: 'Alteração dos Meus Dados',
						message: result.status,
					}
				})
			},
			changeInstallment(e, installment) {
				installment = installment.slice(0, parseInt(e.target.value))
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
