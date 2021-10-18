<template>
	<div class="home">
		<Form @save="save">
			<div slot="title">
				{{ $t('title') }}

				<!-- ID -->
				<div class="row" v-if="this.form.id">
					<div class="col-sm-4">
						<div class="form-group">
							<label for="id">{{ $t('') }}</label>
							<div>
								<input class="form-control" id="id" v-model="form.id" type="text" disabled />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- ****************** ROW ****************** -->

			<div class="row">
				<!-- NOME -->
				<div class="col-sm-6">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.name" type="text" />
					</div>
				</div>
				<!-- CPF/CNPJ -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="document">{{ $t('document') }}</label>
						<input class="form-control" id="document" v-model="form.document" type="text" />
					</div>
				</div>
				<!-- SITE -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="website">{{ $t('website') }}</label>
						<input class="form-control" id="website" v-model="form.website" type="text" />
					</div>
				</div>

				<!-- CIDADE -->
				<div class="col-sm-6">
					<div class="form-group">
						<label for="city">{{ $t('city') }}</label>
						<input class="form-control" id="city" v-model="form.city" type="text" />
					</div>
				</div>

				<!-- ESTADO -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="state">{{ $t('state') }}</label>
						<input class="form-control" id="state" v-model="form.state" type="text" />
					</div>
				</div>

				<!-- BAIRRO -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="neighborhood">{{ $t('neighborhood') }}</label>
						<input class="form-control" id="neighborhood" v-model="form.neighborhood" type="text" />
					</div>
				</div>

				<!-- ENDEREÇO -->
				<div class="col-sm-6">
					<div class="form-group">
						<label for="street">{{ $t('street') }}</label>
						<input class="form-control" id="street" v-model="form.street" type="text" />
					</div>
				</div>

				<!-- NÚMERO -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="number">{{ $t('number') }}</label>
						<input class="form-control" id="number" v-model="form.number" type="text" />
					</div>
				</div>
				<!-- CEP -->
				<div class="col-sm-3">
					<div class="form-group">
						<label for="zipcode">{{ $t('zipcode') }}</label>
						<input class="form-control" id="zipcode" v-model="form.zipcode" type="text" />
					</div>
				</div>
				<!-- TELEFONE -->
				<div class="col-sm-6">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input class="form-control" id="phone" v-model="form.phone" type="text" />
					</div>
				</div>
				<!-- FAX -->
				<div class="col-sm-6">
					<div class="form-group">
						<label for="fax">{{ $t('fax') }}</label>
						<input class="form-control" id="fax" v-model="form.fax" type="text" />
					</div>
				</div>
			</div>

			<!-- ****************** ROW ****************** -->
			<div class="row border-top mt-3" v-if="!this.form.id">
				<!-- EMAIL -->
				<div class="col-sm-6 pt-4">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.mail" type="text" />
					</div>
				</div>

				<!-- SENHA -->
				<div class="col-sm-3 pt-4">
					<div class="form-group">
						<label for="password">{{ $t('password') }}</label>
						<input class="form-control" id="password" v-model="form.password" type="password" />
					</div>
				</div>

				<!-- REPITA SENHA -->
				<div class="col-sm-3 pt-4">
					<div class="form-group">
						<label for="repassword">{{ $t('repassword') }}</label>
						<input class="form-control" id="repassword" v-model="form.repassword" type="password" />
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import MessageError from '../../../../helpers/messages-errors'

	import Global from '../../../../helpers/global'
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Logists from '../../../../controllers/persons/logists'

	import messages from './messages'
	export default {
		name: 'LogistForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				token: localStorage.token,
				alert: {},
			}
		},
		mounted() {
			this.token = localStorage.token
			this.load()
		},
		methods: {
			load() {
				if (this.id) {
					Logists.get(this.id, (result) => {
						if (result.data) {
							this.form = {
								id: result.data.id,
								mail: result.data.sessions ? result.data.sessions.mail : '',
								name: result.data.name,
								phone: result.data.phone,
							}
						}
					})
				} else if (this.token) {
					Logists.getByToken((result) => {
						if (result.data) {
							this.form = result.data
						}
					})
				}
			},
			save() {
				if (this.form) {
					if (this.form.id) {
						Logists.profile(this.form, (result) => {
							this.alert = MessageError.getMessage(this, result, 'title')
							localStorage.userName = result.data.name
							Global.$emit('change-header-name', result.data.name)
						})
					} else if (!this.token) {
						if (this.form.password && this.form.password == this.form.repassword) {
							Logists.insert(this.form, (result) => {
								this.alert = MessageError.getMessage(this, result, 'title')
							})
						} else {
							this.alert = MessageError.getMessage(this, { status: 'Senhas não correspondem' }, 'title')
						}
					}
				}
			},
		},
	}
</script>
