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
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.name" type="text" />
					</div>
				</div>
				<div class="col-sm-6"></div>
			</div>
			<div class="row" v-if="!this.form.id">
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
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form.mail" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input class="form-control" id="phone" v-model="form.phone" type="text" />
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
	import Clients from '../../../../controllers/persons/clients'

	import messages from './messages'
	export default {
		name: 'ClientsForm',
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
				if (this.id && this.id != 0) {
					Clients.get(this.id, (result) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							mail: result.data.sessions ? result.data.sessions.mail : '',
							name: result.data.name,
							phone: result.data.phone,
						}
					})
				}
			},
			save() {
				if (this.id && this.id != 0) {
					Clients.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Cliente',
							message: result.status,
						}
					})
				} else {
					Clients.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Cliente',
							message: result.status,
						}
					})
				}
			},
		},
	}
</script>
