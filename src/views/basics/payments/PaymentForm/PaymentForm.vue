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
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Payments from '../../../../controllers/basics/payments'

	import messages from './messages'
	export default {
		name: 'PaymentForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				payments: [],
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id && this.id != 0) {
					Payments.get(this.id, (payment) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: payment.data.name,
						}
					})
				}
				Payments.list((payments) => {
					this.payments = payments.data
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Payments.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Paymento Padrão',
							message: result.status,
						}
					})
				} else {
					Payments.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Paymento Padrão',
							message: result.status,
						}
						this.id = result.data.id
						this.form.id = result.data.id
						window.location.hash = 'payments/' + result.data.id
					})
				}
			},
		},
	}
</script>
