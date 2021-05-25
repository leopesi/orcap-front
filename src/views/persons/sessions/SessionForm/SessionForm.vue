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
				<div class="col-sm-6">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.mail" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-6"></div>
			</div>
			<div class="row" v-if="!this.form.id">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.mail" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="password">{{ $t('password') }}</label>
						<input class="form-control" id="password" v-model="form.password" type="text" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="last_login">{{ $t('last_login') }}</label>
						<input class="form-control" id="last_login" v-model="form.last_login" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="active">{{ $t('active') }}</label>
						<input class="form-control" id="active" v-model="form.active" type="text" />
					</div>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
	import Form from '../../../components/Form/Form'
	import Sessions from '../../../../controllers/persons/sessions'

	import messages from './messages'
	export default {
		name: 'UserForm',
		props: { id: String },
		i18n: { messages },
		components: { Form },
		data() {
			return {
				form: {
					id: null,
					last_login: '',
				},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Sessions.getSession(this.id, (result) => {
					this.form = {
						id: result.data.id,
						mail: result.data.mail,
						last_login: result.data.last_login,
						active: result.data.active,
					}
				})
			},
			save() {
				if (this.form.id) {
					Sessions.updateSession(this.form, (result) => {
						this.alert = {
							title: 'Salvar Sessao',
							message: result.status,
						}
					})
				} else {
					Sessions.insertSession(this.form, (result) => {
						this.alert = {
							title: 'Salvar Usuário',
							message: result.status,
						}
					})
				}
			},
		},
	}
</script>
