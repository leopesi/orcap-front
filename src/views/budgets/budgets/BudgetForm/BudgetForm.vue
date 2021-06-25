<template>
	<div class="home">
		<Form @save="save">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row" v-if="this.id">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="id">{{ $t('id') }}</label>
						<input class="form-control" id="id" v-model="id" type="text" disabled />
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
							<select class="custom-select" id="layout" v-model="form.layout" @change="changeLayout">
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
			<div class="row" v-if="this.id">
				<div class="col-sm-12 pt-2">
					<Dimensions :form="this.form" :beach="this.showBeach == 'false' ? false : true" @changed="changedDimension" />
				</div>
			</div>
			<div class="row" v-if="this.id">
				<div class="col-sm-12 pt-4">
					<Card class="card" v-if="this.form">
						<div class="card-header">
							{{ $t('equipments') }}
						</div>
						<div class="card-body">
							<div class="row" v-if="this.form">
								<div class="col-sm-6 pb-4" v-for="(equipment, i) in this.form.equipments" :key="i">
									<Filters :id="equipment.id" :discount="equipment.discount" :dimension="form.dimension" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'filters'" />
									<Engines :id="equipment.id" :discount="equipment.discount" :dimension="form.dimension" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'engines'" />
									<Lids :id="equipment.id" :discount="equipment.discount" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'lids'" />
									<Blankets :id="equipment.id" :discount="equipment.discount" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'blankets'" />
									<Profiles :id="equipment.id" :discount="equipment.discount" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'profiles'" />
									<Vinyls :id="equipment.id" :discount="equipment.discount" :equipment="equipment" @changed="changeEquipment" v-if="equipment.type == 'vinyls'" />
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6"></div>
								<div class="col-sm-6 text-right">
									<button type="button" class="btn btn-secondary small" @click="showEquipment">
										{{ $t('add_equipment') }}
									</button>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
			<div class="row" v-if="this.id">
				<div class="col-sm-12 pt-4">
					<ManPower :form="this.form" :layout="this.form.layout" v-if="this.form" />
				</div>
			</div>
			<div class="row" v-if="this.id">
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
										<input class="form-control" v-model="form.discount" type="number" />
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
		<FloatCard :title="$t('add_equipment')" :show="this.showAddEquipment" @close="showAddEquipment = false">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group mb-3">
						<label for="new_equipment">{{ $t('equipment') }}</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="new_equipment" v-model="newEquipment">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(equipment, i) in this.equipments" :key="i">
									{{ equipment }}
								</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" @click="addEquipment">
					{{ $t('add_equipment') }}
				</button>
			</div>
		</FloatCard>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'

	import Budgets from '../../../../controllers/budgets/budgets'
	import Clients from '../../../../controllers/persons/clients'
	import Sellers from '../../../../controllers/persons/sellers'
	// COMPONENTS
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Card from '../../../components/Card/Card'
	import FloatCard from '../../../components/FloatCard/FloatCard'
	// BUDGET COMPONENTS
	import Dimensions from '../Dimenions/Dimension'
	import Filters from '../Equipments/Filters'
	import Engines from '../Equipments/Engines'
	import Lids from '../Equipments/Lids'
	import Blankets from '../Equipments/Blankets'
	import Profiles from '../Equipments/Profiles'
	import Vinyls from '../Equipments/Vinyls'
	import ManPower from '../ManPower/ManPower'

	import Layouts from '../data/layouts'
	import Status from '../data/status'
	import Payments from '../data/payments'
	import Equipments from '../data/equipments'
	import messages from './messages'

	export default {
		name: 'BudgetForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Card, FloatCard, Dimensions, Filters, Engines, Lids, Blankets, Profiles, Vinyls, ManPower },
		data() {
			return {
				form: {
					id: null,
					client_id: null,
					logist_id: null,
					seller_id: null,
					format_id: null,
					status: null,
					layout: null,
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
				equipments: Equipments,
				status: Status,
				layouts: Layouts,
				layout: '',
				alert: {},
				newEquipment: 'filter',
				showEquipments: false,
				showAddEquipment: false,
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
						this.form = Object.assign({}, result.data)
						if (result.data) {
							this.form.expiration_date = Methods.fixSequelizeDate(this.form.expiration_date)
							this.form.updatedAt = Methods.fixSequelizeDate(this.form.updatedAt)
							this.form.createdAt = Methods.fixSequelizeDate(this.form.createdAt)
							this.showBeach = this.form.beach ? this.form.beach.toString() : 'false'
							this.loadEquipments(result.data.equipments)
						}
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
				this.reloadEquipments()
			},
			changeEquipment(equipment) {
				if (equipment && equipment.engine && equipment.lid) {
					const index = this.form.equipments[equipment.index].index
					for (const i in this.form.equipments) {
						if (this.form.equipments[i].index > index && this.form.equipments[i].type == 'engines') {
							this.form.equipments[i].id = equipment.engine.id
							this.form.equipments[i].equipment_id = equipment.engine.equipment_id
						}
						if (this.form.equipments[i].index > index && this.form.equipments[i].type == 'lids') {
							this.form.equipments[i].id = equipment.lid.id
							this.form.equipments[i].equipment_id = equipment.lid.equipment_id
						}
					}
				}

				this.form.equipments[equipment.index].id = equipment.id
				this.form.equipments[equipment.index].equipment_id = equipment.equipment_id
				this.form.equipments[equipment.index].discount = equipment.discount
				this.form = Object.assign({}, this.form)
				this.changedValues()
			},
			reloadEquipments() {
				this.showEquipments = false
				setTimeout(() => {
					this.showEquipments = true
				}, 100)
			},
			changedValues() {
				this.form.cash_price = 0
				this.form.forward_price = 0
				for (const i in this.form.equipments) {
					const profit_margin = parseFloat(this.form.equipments[i].profit_margin)
					const cost = parseFloat(this.form.equipments[i].cost)
					const price = isNaN(cost) ? 0 : cost * (1 + (isNaN(profit_margin) ? 0 : profit_margin))
					if (this.form.equipments[i].type == 'vinyls') {
						this.form.cash_price += (price * this.form.m2_total)
					} else {
						this.form.cash_price += price
					}
					// this.form.forward_price += parseFloat(this.form.equipments[i].forward_price)
				}
			},
			loadEquipments(equipments) {
				if (!this.form.equipments) this.form.equipments = {}
				for (const i in equipments) {
					const equipment = equipments[i]
					this.form.equipments[equipment.index] = equipment
				}
				this.form = Object.assign({}, this.form)
				this.changeLayout()
				this.changedValues()
			},
			changeLayout() {
				this.layout = Layouts[this.form.layout]
				if (!this.form.equipments) this.form.equipments = {}
				for (const i in this.layout.equipments) {
					const type = this.layout.equipments[i]
					let finded = false
					for (const j in this.form.equipments) {
						if (this.form.equipments[j].type == type) {
							finded = true
						}
					}
					if (!finded) {
						const index = Object.keys(this.form.equipments).length
						this.form.equipments[index] = { type, index }
					}
				}
				this.reloadEquipments()
			},
			showEquipment() {
				this.showAddEquipment = true
				this.newEquipment = Object.keys(this.equipments)[0]
			},
			addEquipment() {
				const index = Object.keys(this.form.equipments).length
				const type = this.newEquipment
				this.form.equipments[index] = { type, index }
				if (type == 'filters') {
					this.form.equipments[index + 1] = { type: 'engines', index: index + 1 }
					this.form.equipments[index + 2] = { type: 'lids', index: index + 2 }
				}
				this.showAddEquipment = false
			},
		},
	}
</script>
