<template>
	<Card>
		<div class="card-header">
			{{ $t('client') }}
		</div>
		<div class="card-body" v-if="this.show">
			<div class="row" v-if="this.form.client_id">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="id">{{ $t('id') }}</label>
						<input class="form-control" id="id" v-model="form.clients.id" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.clients.name" type="text" />
					</div>
				</div>
				<div class="col-sm-6"></div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="document">{{ $t('document') }}</label>
						<input class="form-control" id="document" v-model="form.clients.document" type="text" @change="getClientByDocument" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input class="form-control" id="phone" v-model="form.clients.phone" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.clients.mail" type="text" />
					</div>
				</div>
				<div class="col-sm-6" v-if="this.form.client_id">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.clients.name" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="address">{{ $t('address') }}</label>
						<input class="form-control" id="address" v-model="form.clients.address" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="complement">{{ $t('complement') }}</label>
						<input class="form-control" id="complement" v-model="form.clients.complement" type="text" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="city">{{ $t('city') }}</label>
						<input class="form-control" id="city" v-model="form.clients.city" type="text" />
					</div>
				</div>
				<div class="col-sm-2">
					<div class="form-group">
						<label for="state">{{ $t('state') }}</label>
						<input class="form-control" id="state" v-model="form.clients.state" type="text" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	import Clients from '../../../../controllers/persons/clients'
	import Card from '../../../components/Card/Card.vue'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Client',
		components: { Card },
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				show: false,
			}
		},
		beforeUpdate() {
			if (!this.form.clients) {
				this.form.clients = {}
				this.reload()
			} else {
				if (this.form.clients.sessions) {
					const mail = Object.assign({}, { mail: this.form.clients.sessions.mail })
					this.form.clients.mail = mail.mail
				}
			}
		},
		mounted() {
			this.reload()
		},
		watch: {},
		methods: {
			getClientByDocument(e) {
				if (this.form.clients) {
					Clients.getClientByDocument(this.form.clients.document, (result) => {
						console.log(result)
						const oldValue = Object.assign({}, { value: e.target.value })
						if (result.data && result.data[0]) {
							this.form.clients = Object.assign({}, result.data[0])
							this.form.client_id = result.data[0].id
							this.form.clients.mail = result.data[0].sessions.mail
							this.show = false
						} else {
							this.form.clients = Object.assign({}, null)
							this.form.client_id = null
						}
						this.form.clients.document = oldValue.value
						this.reload()
					})
				}
			},
			reload() {
				setTimeout(() => {
					this.show = true
				}, 1)
			},
		},
	}
</script>
