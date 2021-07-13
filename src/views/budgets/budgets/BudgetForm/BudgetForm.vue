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
						<label for="seller_id">{{ $t('seller') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="seller_id" v-model="form.seller_id">
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
				<div class="col-sm-6">
					<div class="form-group">
						<label for="layout">{{ $t('layout') }}</label>
						<div class="input-group">
							<select class="form-control custom-select" id="layout" v-model="form.layout" @change="changeLayout">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(layout, i) in this.layouts" :key="i">
									{{ layout.name }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="status">{{ $t('status') }}</label>
						<div class="input-group">
							<select class="form-control custom-select" id="status" v-model="form.status">
								<!-- <option selected>{{ $t('choose') }}</option> -->
								<option :value="i" v-for="(s, i) in this.status" :key="i">
									{{ s }}
								</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="expiration_date">{{ $t('expiration_date') }}</label>
						<input class="form-control" id="expiration_date" v-model="form.expiration_date" type="date" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-2">
					<Client :form="this.form" @changed="changedClient" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-4">
					<Dimensions :form="this.form" @changed="changedDimension" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-4">
					<Card class="card" v-if="this.form">
						<div class="card-header">
							{{ $t('equipments') }}
						</div>
						<div class="">
							<div class="row" v-if="this.form">
								<div class="col-sm-4 pb-4" v-for="(equipment, i) in this.form.equipments" :key="i">
									<Filters :index="equipment.index" :form="form" :dimension="form.dimension" :tax="parseFloat(form.installment_tax)" @changed="changeEquipment" v-if="equipment.type == 'filters'" />
									<Engines :index="equipment.index" :form="form" :dimension="form.dimension" :tax="parseFloat(form.installment_tax)" @changed="changeEquipment" v-if="equipment.type == 'engines'" />
									<Lids :index="equipment.index" :form="form" :tax="parseFloat(form.installment_tax)" @changed="changeEquipment" v-if="equipment.type == 'lids'" />
									<Blankets
										:index="equipment.index"
										:form="form"
										:m2_facial="parseFloat(form.m2_facial)"
										:tax="parseFloat(form.installment_tax)"
										@changed="changeEquipment"
										v-if="equipment.type == 'blankets'"
									/>
									<Profiles
										:index="equipment.index"
										:form="form"
										:perimeter="parseFloat(form.perimeter)"
										:tax="parseFloat(form.installment_tax)"
										@changed="changeEquipment"
										v-if="equipment.type == 'profiles'"
									/>
									<Vinyls
										:index="equipment.index"
										:form="form"
										:m2_total="parseFloat(form.m2_total)"
										:tax="parseFloat(form.installment_tax)"
										@changed="changeEquipment"
										v-if="equipment.type == 'vinyls'"
									/>
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
			<div class="row">
				<div class="col-sm-12 pt-4">
					<ManPower :form="this.form" :layout="this.form.layout" :logist="this.logist" v-if="this.form" @change="changedValues" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 pt-4">
					<div class="card" v-if="this.form">
						<div class="card-header">
							{{ $t('totals') }}
						</div>
						<div class="">
							<div class="row">
								<div class="col-sm-4">
									<div class="form-group mb-3">
										<label for="payment">{{ $t('payment') }}</label>
										<div class="input-group mb-3">
											<select class="form-control custom-select" id="payment" v-model="form.payment" @change="changeTax">
												<!-- <option selected>{{ $t('choose') }}</option> -->
												<option :value="i" v-for="(payment, i) in this.payments" :key="i">
													{{ payment }}
												</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="installment_number">{{ $t('installment_number') }}</label>
										<input class="form-control" id="installment_number" v-model="form.installment_number" type="number" @keyup="changeTax" />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="down_payment">{{ $t('down_payment') }}</label>
										<input class="form-control" id="down_payment" v-model="form.down_payment" type="number" @keyup="changeTax" />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="installment_tax">{{ $t('installment_tax') }}</label>
										<input class="form-control" id="installment_tax" v-model="form.installment_tax" type="number" disabled />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="installment_value">{{ $t('installment_value') }}</label>
										<input class="form-control" id="installment_value" :value="parseFloat(form.forward_price_total / form.installment_number).toFixed(2)" type="number" disabled />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="art">{{ $t('art') }}</label>
										<input class="form-control" v-model="form.art" type="number" @keyup="changeTax" />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="discount">{{ $t('discount') }}</label>
										<input class="form-control" v-model="form.discount" type="number" @keyup="changeTax" />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="cash_price">{{ $t('cash_price') }}</label>
										<input class="form-control" id="cash_price" type="text" :value="this.form.cash_price" disabled />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="forward_price">{{ $t('forward_price') }}</label>
										<input class="form-control" id="forward_price" type="text" :value="this.form.forward_price" disabled />
									</div>
								</div>
								<div class="col-sm-2">
									<div class="form-group">
										<label for="cash_price_total">{{ $t('cash_price_total') }}</label>
										<input class="form-control" id="cash_price_total" type="text" :value="this.form.cash_price_total" disabled />
									</div>
								</div>
								<div class="col-sm-2">
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
							<select class="form-control custom-select" id="new_equipment" v-model="newEquipment">
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
	import Logists from '../../../../controllers/persons/logists'
	import Clients from '../../../../controllers/persons/clients'
	import Sellers from '../../../../controllers/persons/sellers'
	// COMPONENTS
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Card from '../../../components/Card/Card'
	import FloatCard from '../../../components/FloatCard/FloatCard'
	// BUDGET COMPONENTS
	import Client from '../Client/Client.vue'
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
	import './style.css'

	export default {
		name: 'BudgetForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Card, FloatCard, Client, Dimensions, Filters, Engines, Lids, Blankets, Profiles, Vinyls, ManPower },
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
				logist: {},
				payments: Payments,
				equipments: Equipments,
				status: Status,
				layouts: Layouts,
				layout: '',
				alert: {},
				newEquipment: 'filter',
				showEquipments: false,
				showAddEquipment: false,
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
							this.form.expiration_date = Methods.fixSequelizeOnlyDate(this.form.expiration_date)
							this.form.updatedAt = Methods.fixSequelizeDate(this.form.updatedAt)
							this.form.createdAt = Methods.fixSequelizeDate(this.form.createdAt)
							this.changedDimension()
							this.loadEquipments(result.data.equipments)
							this.changeLayout()
							this.changeTax()
						}
					})
				} else {
					this.form.payment = Object.keys(this.payments)[0]
					this.form.status = Object.keys(this.status)[0]
					this.form.layout = Object.keys(this.layouts)[0]
					setTimeout(() => {
						this.changeLayout()
					}, 500)
				}
				Logists.getByToken((result) => {
					this.logist = result.data
				})
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
					if (this.form) delete this.form.id
					Budgets.insertBudget(this.form, (result) => {
						this.form.id = result.data.id
						window.location.hash = '/budget/' + result.data.id
						this.form.expiration_date = Methods.fixSequelizeDate(result.data.expiration_date)
						this.form.updatedAt = Methods.fixSequelizeDate(result.data.updatedAt)
						this.form.createdAt = Methods.fixSequelizeDate(result.data.createdAt)
						this.changedDimension()
						this.changeLayout()
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
			changedClient() {},
			changeEquipment(equipment) {
				if (equipment && equipment.engine && equipment.lid) {
					// 	const index = this.form.equipments[equipment.index].index
					// 	for (const i in this.form.equipments) {
					// 		if (this.form.equipments[i].index > index && this.form.equipments[i].type == 'engines') {
					// 			this.form.equipments[i].id = equipment.engine.id
					// 			this.form.equipments[i].equipment_id = equipment.engine.equipment_id
					// 		}
					// 		if (this.form.equipments[i].index > index && this.form.equipments[i].type == 'lids') {
					// 			this.form.equipments[i].id = equipment.lid.id
					// 			this.form.equipments[i].equipment_id = equipment.lid.equipment_id
					// 		}
					// 	}
				}

				// this.form.equipments[equipment.index].id = equipment.id
				// this.form.equipments[equipment.index].equipment_id = equipment.equipment_id
				// this.form.equipments[equipment.index].discount = equipment.discount
				// this.form.equipments[equipment.index].final_price = equipment.final_price
				// this.form = Object.assign({}, this.form)
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
					this.form.cash_price += this.form.equipments[i].final_price
				}
				const construction_labor = parseFloat(this.form.construction_labor) * this.form.m2_total
				const excavation_labor = parseFloat(this.form.excavation_labor) * this.form.m3_total
				const earth_removal_labor = parseFloat(this.form.earth_removal_labor) * this.form.m3_total * 1.2
				const short_wall_labor = parseFloat(this.form.short_wall_labor)
				const subfloor_labor = parseFloat(this.form.subfloor_labor) * (this.form.perimeter * this.form.sidewalk_width + this.form.sidewalk_width * this.form.sidewalk_width * 4)
				const material_placement_labor = parseFloat(this.form.material_placement_labor)
				const reserve = parseFloat(this.form.reserve)
				const job_monitoring_fee = parseFloat(this.form.job_monitoring_fee)

				this.form.cash_price += isNaN(construction_labor) ? 0 : construction_labor
				this.form.cash_price += isNaN(excavation_labor) ? 0 : excavation_labor
				this.form.cash_price += isNaN(earth_removal_labor) ? 0 : earth_removal_labor
				this.form.cash_price += isNaN(short_wall_labor) ? 0 : short_wall_labor
				this.form.cash_price += isNaN(subfloor_labor) ? 0 : subfloor_labor
				this.form.cash_price += isNaN(material_placement_labor) ? 0 : material_placement_labor
				this.form.cash_price += isNaN(reserve) ? 0 : reserve
				this.form.cash_price += isNaN(job_monitoring_fee) ? 0 : job_monitoring_fee

				this.form.cash_price_total = this.form.cash_price - (isNaN(this.form.discount) ? 0 : this.form.discount) + (this.form.cash_price * (isNaN(this.form.art) ? 0 : this.form.art)) / 100

				this.form.cash_price = this.form.cash_price.toFixed(2)
				this.form.cash_price_total = this.form.cash_price_total.toFixed(2)
			},
			changeTax() {
				try {
					this.changedValues()
					if (this.form.installment_number > 0) {
						if (this.form.payment == 'in_cash') {
							this.form.installment_tax = 0
							this.form.forward_price = parseFloat(this.form.cash_price).toFixed(2)
							this.form.forward_price_total = parseFloat(this.form.cash_price_total).toFixed(2)
						} else if (this.form.payment == 'debit_card') {
							this.form.installment_tax = this.logist[this.form.payment]
							this.form.forward_price = parseFloat(parseFloat(this.form.cash_price) + (parseFloat(this.form.cash_price) * parseFloat(this.form.installment_tax)) / 100).toFixed(2)
							this.form.forward_price_total = parseFloat(parseFloat(this.form.cash_price_total) + (parseFloat(this.form.cash_price_total) * parseFloat(this.form.installment_tax)) / 100).toFixed(2)
						} else if (this.form.payment == 'by_financial' || this.form.payment == 'by_financial_down_payment') {
							const installment_tax = JSON.parse(this.logist[this.form.payment])
							const tax = parseFloat(installment_tax[this.form.installment_number - 1])
							if (isNaN(tax)) {
								this.form.installment_tax = 0
							} else {
								const installment_cash = parseFloat(parseFloat(this.form.cash_price) * parseFloat(tax)).toFixed(2)
								const total_price_cash = installment_cash * this.form.installment_number
								this.form.installment_tax = ((total_price_cash * 100) / this.form.cash_price - 100).toFixed(2)
							}
						} else if (this.form.payment == 'installment_credit_card') {
							const installment_tax = JSON.parse(this.logist[this.form.payment])
							this.form.installment_tax = installment_tax[this.form.installment_number - 1]
						}
					} else {
						this.form.installment_tax = 0
					}
					const cash_price = isNaN(parseFloat(this.form.cash_price)) ? 0 : parseFloat(this.form.cash_price)
					const down_payment = isNaN(parseFloat(this.form.down_payment)) ? 0 : parseFloat(this.form.down_payment)
					const cash_price_total = isNaN(parseFloat(this.form.cash_price_total)) ? 0 : parseFloat(this.form.cash_price_total)
					const installment_tax = isNaN(parseFloat(this.form.installment_tax)) ? 0 : parseFloat(this.form.installment_tax)
					this.form.forward_price = parseFloat(cash_price - down_payment + ((cash_price - down_payment) * installment_tax) / 100).toFixed(2)
					this.form.forward_price_total = parseFloat(cash_price_total - down_payment + ((cash_price_total - down_payment) * installment_tax) / 100).toFixed(2)
				} catch (e) {
					this.form.installment_tax = 0
				}
			},
			loadEquipments(equipments) {
				if (!this.form.equipments) this.form.equipments = {}
				for (const i in equipments) {
					const equipment = equipments[i]
					this.form.equipments[equipment.index] = equipment
					this.form.equipments[equipment.index].discount = isNaN(parseFloat(equipment.discount)) ? 0 : parseFloat(equipment.discount)
					this.form.equipments[equipment.index].final_price = isNaN(parseFloat(equipment.final_price)) ? 0 : parseFloat(equipment.final_price)
				}
				this.form = Object.assign({}, this.form)
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
				this.loadEquipments()
				this.changedValues()
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
