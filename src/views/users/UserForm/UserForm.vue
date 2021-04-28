<template>
	<div class="home">
		<Form @save="saveItem">
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row" v-if="this.form.id">
				<div class="col">
					<div class="form-control">
						<label>{{ $t('id') }}</label>
						<input v-model="form.id" type="text" disabled />
					</div>
				</div>
				<div class="col">
					<div class="form-control">
						<label>{{ $t('mail') }}</label>
						<input v-model="form.mail" type="text" disabled />
					</div>
				</div>
				<div class="col"></div>
			</div>
			<div class="row" v-if="!this.form.id">
				<div class="col">
					<div class="form-control">
						<label>{{ $t('mail') }}</label>
						<input v-model="form.mail" type="text" />
					</div>
				</div>
				<div class="col">
					<div class="form-control">
						<label>{{ $t('password') }}</label>
						<input v-model="form.password" type="text" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="form-control">
						<label>{{ $t('name') }}</label>
						<input v-model="form.name" type="text" />
					</div>
				</div>
				<div class="col">
					<div class="form-control">
						<label>{{ $t('phone') }}</label>
						<input v-model="form.phone" type="text" />
					</div>
				</div>
			</div>
		</Form>
		<Alert
			:title="this.alert.title"
			:message="this.alert.message"
			@close="alert = {}"
		/>
	</div>
</template>

<script>
	import Form from '../../components/Form/Form'
	import Alert from '../../components/Alert/Alert'
	import Users from '../../../controllers/users'

	import messages from './messages'
	export default {
		name: 'UserForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				alert: {},
			}
		},
		mounted() {
			this.loadItem()
		},
		methods: {
			loadItem() {
				Users.getUser(this.id, (result) => {
					this.form = {
						id: result.data.id,
						mail: result.data.sessions ? result.data.sessions.mail : '',
						name: result.data.name,
						phone: result.data.phone,
					}
				})
			},
			saveItem() {
				if (this.form.id) {
					Users.updateUser(this.form, (result) => {
						this.alert = {
							title: 'Salvar Usuário',
							message: result.status,
						}
					})
				} else {
					Users.insertUser(this.form, (result) => {
						console.log(result)
					})
				}
			},
		},
	}
</script>
