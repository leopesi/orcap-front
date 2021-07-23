<template>
	<div class="home">
		<Form @save="save">
			<div slot="title" v-if="!this.token">
				{{ $t('title') }}
			</div>
			<div slot="title" v-if="this.token">
				{{ $t('profile') }}
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.name" type="text" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="document">{{ $t('document') }}</label>
						<input class="form-control" id="document" v-model="form.document" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input class="form-control" id="phone" v-model="form.phone" type="text" />
					</div>
				</div>
			</div>
			<div class="row" v-if="!this.token">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.mail" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="password">{{ $t('password') }}</label>
						<input class="form-control" id="password" v-model="form.password" type="password" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="repeat_password">{{ $t('repeat_password') }}</label>
						<input class="form-control" id="repeat_password" v-model="form.repeat_password" type="password" />
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
							this.form = {
								id: result.data.id,
								name: result.data.name,
								document: result.data.document,
								phone: result.data.phone,
							}
						}
					})
				}
			},
			save() {
				if (this.form) {
					if (this.form.id) {
						Logists.update(this.form, (result) => {
							this.alert = MessageError.getMessage(this, result, 'title')
							localStorage.userName = result.data.name
							Global.$emit('change-header-name', result.data.name)
						})
					} else if (!this.token) {
						Logists.insert(this.form, (result) => {
							this.alert = MessageError.getMessage(this, result, 'title')
						})
					}
				}
			},
		},
	}
</script>
