<template>
	<div class="home">
		<div @save="save" v-if="this.token && this.form">
			<div class="card">
				<div class="card-header">{{ $t('title') }}</div>
				<ul class="nav nav-pills pt-2">
					<!-- MARCAS -->
					<li class="nav-item">
						<a :class="'nav-link ' + (this.actualTab == 'brands' ? ' active' : '')" aria-current="page" @click="actualTab = 'brands'">
							{{ $t('brands') }}
						</a>
					</li>

					<!-- MÃO DE OBRA -->
					<li class="nav-item">
						<a :class="'nav-link ' + (this.actualTab == 'manpowers' ? ' active' : '')" aria-current="page" @click="actualTab = 'manpowers'">
							{{ $t('man_power') }}
						</a>
					</li>

					<!-- FINANCEIRO -->
					<li class="nav-item">
						<a :class="'nav-link ' + (this.actualTab == 'financials' ? ' active' : '')" aria-current="page" @click="actualTab = 'financials'">
							{{ $t('financial') }}
						</a>
					</li>
				</ul>
			</div>

			<!-- TABS -->
			<div class="row">
				<div class="col-sm-12">
					<BrandsTab :token="this.token" :form="this.form" :brands="this.brands" v-if="this.actualTab == 'brands'" />
				</div>
				<div class="col-sm-12">
					<ManPowersTab :token="this.token" :form="this.form" :brands="this.brands" v-if="this.actualTab == 'manpowers'" />
				</div>
				<div class="col-sm-12">
					<FinancialsTab :token="this.token" :form="this.form" :brands="this.brands" v-if="this.actualTab == 'financials'" />
				</div>
			</div>
		</div>
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import MessageError from '../../../../helpers/messages-errors'
	import Logists from '../../../../controllers/persons/logists'
	import Brands from '../../../../controllers/basics/brands'
	import Alert from '../../../components/Alert/Alert'
	import BrandsTab from './Tabs/Brands.vue'
	import ManPowersTab from './Tabs/ManPowers.vue'
	import FinancialsTab from './Tabs/Financials.vue'

	import messages from './messages'
	export default {
		name: 'LogistForm',
		props: { id: String },
		i18n: { messages },
		components: { BrandsTab, ManPowersTab, FinancialsTab, Alert },
		data() {
			return {
				form: {
					brand_filter_id: null,
					brand_blanket_id: null,
					brand_profile_id: null,
					brand_vinyl_id: null,
				},
				// 	/* number_installment_credit_card: 0,
				// installment_credit_card: [],
				// number_by_logist: 0,
				// by_logist: [],
				// number_by_financial: 0,
				// by_financial: [],
				// number_by_financial_down_payment: 0,
				// by_financial_down_payment: [],*/
				token: localStorage.token,
				brands: null,
				actualTab: 'brands',
        alert: {},
			}
		},
		mounted() {
			this.token = localStorage.token
			this.load()
		},
		methods: {
			load() {
				Logists.getByToken((result) => {
					if (result && result.data) {
						this.form = result.data
						// this.installment_credit_card = JSON.parse(result.data.installment_credit_card)
						// if (!this.installment_credit_card) this.installment_credit_card = []
						// this.number_installment_credit_card = this.installment_credit_card.length

						// this.by_logist = JSON.parse(result.data.by_logist)
						// if (!this.by_logist) this.by_logist = []
						// this.number_by_logist = this.by_logist.length

						// this.by_financial = JSON.parse(result.data.by_financial)
						// if (!this.by_financial) this.by_financial = []
						// this.number_by_financial = this.by_financial.length

						// this.by_financial_down_payment = JSON.parse(result.data.by_financial_down_payment)
						// if (!this.by_financial_down_payment) this.by_financial_down_payment = []
						// this.number_by_financial_down_payment = this.by_financial_down_payment.length
						Brands.list((brands) => {
							this.brands = brands.data
						})
					} else {
						this.alert = MessageError.getMessage(this, result, 'title')
					}
				})
			},
			save() {
				// 	this.form.installment_credit_card = JSON.stringify(this.installment_credit_card)
				// 	this.form.by_logist = JSON.stringify(this.by_logist)
				// 	this.form.by_financial = JSON.stringify(this.by_financial)
				// 	this.form.by_financial_down_payment = JSON.stringify(this.by_financial_down_payment)
				Logists.update(this.form, (result) => {
					this.alert = {
						title: 'Alteração dos Meus Dados',
						message: result.status,
					}
				})
			},
			// changeInstallment(e, installment) {
			// 	installment = installment.slice(0, parseInt(e.target.value))
			// 	for (let i = 0; i < parseInt(e.target.value); i++) {
			// 		if (i >= installment.length) {
			// 			installment.push(0)
			// 		}
			// 	}
			// 	return installment
			// },
		},
	}
</script>
