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
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form.name" type="text" />
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
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import MessageError from '../../../../helpers/messages-errors'
	
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Sellers from '../../../../controllers/persons/sellers'

	import messages from './messages'
	export default {
		name: 'SellerForm',
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
					Sellers.get(this.id, (result) => {
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
					Sellers.update(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title', 'sellers')
					})
				} else {
					Sellers.insert(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
						if (result.data) {
							this.id = result.data.id
							this.form.id = result.data.id
							window.location.hash = 'sellers/' + result.data.id
						}
					})
				}
			},
		},
	}
</script>
