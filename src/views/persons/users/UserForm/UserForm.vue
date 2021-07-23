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
						<input v-model="form.id" type="text" class="form-control" id="id" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input v-model="form.mail" type="text" class="form-control" id="mail" />
					</div>
				</div>
				<div class="col"></div>
			</div>
			<div class="row" v-if="!this.form.id">
				<div class="col">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input v-model="form.mail" type="text" class="form-control" id="mail" />
					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label>{{ $t('password') }}</label>
						<input v-model="form.password" type="text" class="form-control" id="mail" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input v-model="form.name" type="text" class="form-control" id="name" />
					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input v-model="form.phone" type="text" class="form-control" id="phone" />
					</div>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import MessageError from '../../../../helpers/messages-errors'
	
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Users from '../../../../controllers/persons/users'

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
			this.load()
		},
		methods: {
			load() {
				Users.getUser(this.id, (result) => {
					this.form = {
						id: result.data.id,
						mail: result.data.sessions ? result.data.sessions.mail : '',
						name: result.data.name,
						phone: result.data.phone,
					}
				})
			},
			save() {
				if (this.form.id) {
					Users.updateUser(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
					})
				} else {
					Users.insertUser(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
					})
				}
			},
		},
	}
</script>
