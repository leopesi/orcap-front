<template>
	<div class="home">
		<Form @save="save">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row" v-if="this.form.id">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="id">{{ $t('id') }}</label>
						<input class="form-control" id="id" v-model="form.id" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="createdAt">{{ $t('createdAt') }}</label>
						<input class="form-control" id="createdAt" v-model="form.createdAt" type="datetime-local" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="updatedAt">{{ $t('updatedAt') }}</label>
						<input class="form-control" id="updatedAt" v-model="form.updatedAt" type="datetime-local" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="client_id">{{ $t('client') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="client_id" v-model="form.client_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="client.id" v-for="(client, i) in this.clients" :key="i">
									{{ client.name }}
								</option>
							</select>
							<div class="input-group-append">
								<label class="input-group-text" for="client">{{ $t('new_client') }}</label>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="seller_id">{{ $t('seller') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="seller_id" v-model="form.seller_id">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="seller.id" v-for="(seller, i) in this.sellers" :key="i">
									{{ seller.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="payment">{{ $t('payment') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="payment" v-model="form.payment">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(payment, i) in this.payments" :key="i">
									{{ payment }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="status">{{ $t('status') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="status" v-model="form.status">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(s, i) in this.status" :key="i">
									{{ s }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="layout">{{ $t('layout') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="layout" v-model="form.layout">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(layout, i) in this.layouts" :key="i">
									{{ layout.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="beach">{{ $t('beach') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="beach" v-model="form.beach" @change="showBeach = $event.target.value">
								<option selected :value="false">{{ $t('no') }}</option>
								<option :value="true">{{ $t('yes') }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-2">
					<Dimensions :form="this.form" @change="showEquipments = false" @changed="changedDimension" />
				</div>
			</div>
			<div class="row" v-if="this.showBeach == 'true'">
				<div class="col-sm-12 pt-4">
					<DimensionsBeach :form="this.form" @change="showEquipments = false" @changed="changedDimension" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-4">
					<Filters :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
				<div class="col-sm-12 pt-4">
					<Engines :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
				<div class="col-sm-12 pt-4">
					<Lids :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
				<div class="col-sm-12 pt-4">
					<Blankets :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
				<div class="col-sm-12 pt-4">
					<Profiles :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
				<div class="col-sm-12 pt-4">
					<Vinyls :form="this.form" v-if="this.showEquipments" @changed="changedValues" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-4">
					<div class="card" v-if="this.form">
						<div class="card-header">
							{{ $t('totals') }}
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group">
										<label for="cash_price">{{ $t('cash_price') }}</label>
										<input class="form-control" id="cash_price" type="text" :value="this.form.cash_price" disabled />
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="forward_price">{{ $t('forward_price') }}</label>
										<input class="form-control" id="forward_price" type="text" :value="this.form.forward_price" disabled />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group">
										<label for="expiration_date">{{ $t('expiration_date') }}</label>
										<input class="form-control" id="expiration_date" v-model="form.expiration_date" type="datetime-local" />
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="discount">{{ $t('discount') }}</label>
										<input class="form-control" id="discount" v-model="form.discount" type="number" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<div class="form-group">
										<label for="cash_price_total">{{ $t('cash_price_total') }}</label>
										<input class="form-control" id="cash_price_total" type="text" :value="this.form.cash_price_total" disabled />
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="forward_price_total">{{ $t('forward_price_total') }}</label>
										<input class="form-control" id="forward_price_total" type="text" :value="this.form.forward_price_total" disabled />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'

	import Budgets from '../../../../controllers/budgets/budgets'
	import Clients from '../../../../controllers/persons/clients'
	import Sellers from '../../../../controllers/persons/sellers'

	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Dimensions from '../Dimenions/Dimension'
	import DimensionsBeach from '../Dimenions/DimensionBeach'
	import Filters from '../Equipments/Filters'
	import Engines from '../Equipments/Engines'
	import Lids from '../Equipments/Lids'
	import Blankets from '../Equipments/Blankets'
	import Profiles from '../Equipments/Profiles'
	import Vinyls from '../Equipments/Vinyls'

	import Layouts from '../data/layouts'
	import Status from '../data/status'
	import Payments from '../data/payments'
	import messages from './messages'

	export default {
		name: 'BudgetForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Dimensions, DimensionsBeach, Filters, Engines, Lids, Blankets, Profiles, Vinyls },
		data() {
			return {
				form: {
					id: null,
					client_id: null,
					logist_id: null,
					seller_id: null,
					format_id: null,
					status: null,
					layout_id: null,
					date: null,
					length: null,
					width: null,
					initial_depth: null,
					final_depth: null,
					average_depth: null,
					sidewalk_width: null,
					perimeter: null,
					pool_area: null,
				},
				clients: [],
				sellers: [],
				payments: Payments,
				status: Status,
				layouts: Layouts,
				alert: {},
				showEquipments: false,
				showBeach: false,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id) {
					Budgets.getBudget(this.id, (result) => {
						this.form = result.data
						this.form.expiration_date = Methods.fixSequelizeDate(this.form.expiration_date)
						this.form.updatedAt = Methods.fixSequelizeDate(this.form.updatedAt)
						this.form.createdAt = Methods.fixSequelizeDate(this.form.createdAt)
						this.showBeach = this.form.beach.toString()
						setTimeout(() => {
							
						}, 1)
					})
				} else {
					this.form.payment = Object.keys(this.payments)[0]
					this.form.status = Object.keys(this.status)[0]
					this.form.layout = Object.keys(this.layouts)[0]
					this.form.beach = false
				}
				Sellers.list((result) => {
					this.sellers = result.data
				})
				Clients.list((result) => {
					this.clients = result.data
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Budgets.updateBudget(this.form, (result) => {
						this.alert = {
							title: 'Salvar Orçamento',
							message: result.status,
						}
					})
				} else {
					delete this.form.id
					Budgets.insertBudget(this.form, (result) => {
						Methods.openPage(this, 'budget/' + result.data.id)
					})
				}
			},
			changedDimension() {
				this.form.dimension = {
					width: this.form.width,
					length: this.form.length,
					initial_depth: this.form.initial_depth,
					final_depth: this.form.final_depth,
					sidewalk_width: this.form.sidewalk_width,
				}
				this.showEquipments = false
				setTimeout(() => {
					this.showEquipments = true
				}, 1)
			},
			changedValues() {
				this.form.cash_price = 0
				this.form.forward_price = 0
				for (const i in this.form.equipments) {
					this.form.cash_price += parseFloat(this.form.equipments[i].cash_price)
					this.form.forward_price += parseFloat(this.form.equipments[i].forward_price)
				}
			},
		},
	}
</script>
