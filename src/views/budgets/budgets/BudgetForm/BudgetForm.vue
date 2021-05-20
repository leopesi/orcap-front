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
								<option selected>{{ $t('choose') }}</option>
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
								<option selected>{{ $t('choose') }}</option>
								<option :value="seller.id" v-for="(seller, i) in this.sellers" :key="i">
									{{ seller.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="payment_id">{{ $t('payment') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="payment_id" v-model="form.payment_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="payment.id" v-for="(payment, i) in this.payments" :key="i">
									{{ payment.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="status_budget_id">{{ $t('status') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="status_budget_id" v-model="form.status_budget_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="status.id" v-for="(status, i) in this.status_budget" :key="i">
									{{ status.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="type_budget_id">{{ $t('type') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="type_budget_id" v-model="form.type_budget_id">
								<option selected>{{ $t('choose') }}</option>
								<option :value="type.id" v-for="(type, i) in this.types_budget" :key="i">
									{{ type.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<Dimensions :form="this.form" @change="showEquipments = false" @changed="changedDimension" />
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
										<input
											class="form-control"
											id="forward_price"
											type="text"
											:value="this.form.forward_price"
											disabled
										/>
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
	import Budgets from '../../../../controllers/budgets/budgets'
	import Defaults from '../../../../controllers/budgets/defaults'
	import Clients from '../../../../controllers/persons/clients'
	import Sellers from '../../../../controllers/persons/sellers'

	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Dimensions from '../Dimenions/Dimension'
	import Filters from '../Equipments/Filters'
	import Engines from '../Equipments/Engines'
	import Lids from '../Equipments/Lids'
	import Blankets from '../Equipments/Blankets'
	import Profiles from '../Equipments/Profiles'
	import Vinyls from '../Equipments/Vinyls'

	import messages from './messages'

	export default {
		name: 'BudgetForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Dimensions, Filters, Engines, Lids, Blankets, Profiles, Vinyls },
		data() {
			return {
				form: {
					id: null,
					client_id: null,
					logist_id: null,
					seller_id: null,
					format_id: null,
					status_budget_id: null,
					type_budget_id: null,
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
				payments: [],
				status_budget: [],
				types_budget: [],
				alert: {},
				showEquipments: false,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id) {
					Budgets.getBudget(this.id, (result) => {
						console.log(result)
						this.form = result.data
						this.form.createdAt = this.form.createdAt.split('.').reverse().slice(1).join('.')
						this.form.updatedAt = this.form.updatedAt.split('.').reverse().slice(1).join('.')
					})
				}
				Sellers.sellers((result) => {
					this.sellers = result.data
				})
				Clients.clients((result) => {
					this.clients = result.data
				})
				Defaults.statusBudgets((result) => {
					this.status_budget = result.data
				})
				Defaults.typesBudgets((result) => {
					this.types_budget = result.data
				})
				Defaults.payments((result) => {
					this.payments = result.data
				})
			},
			save() {
				if (this.id) {
					console.log(this.form)
					Budgets.updateBudget(this.form, (result) => {
						console.log(result)
					})
				} else {
					delete this.form.id
					Budgets.insertBudget(this.form, (result) => {
						console.log(result)
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
