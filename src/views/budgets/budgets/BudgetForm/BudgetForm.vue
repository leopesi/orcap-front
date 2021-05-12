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
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group mb-3">
						<label for="client">Options</label>
						<div class="input-group mb-3">
							<select class="custom-select" id="client" v-model="form.client">
								<option selected>Choose...</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
							<div class="input-group-append">
								<label class="input-group-text" for="client">{{ $t('new_client') }}</label>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="date">{{ $t('date') }}</label>
						<input
							class="form-control"
							id="date"
							v-model="form.date"
							type="date"
							:disabled="this.form.id ? true : false"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<Dimensions :form="this.form"/>
				</div>
			</div>
		</Form>
		<Alert :title="this.alert.title" :message="this.alert.message" @close="alert = {}" />
	</div>
</template>

<script>
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Logists from '../../../../controllers/persons/logists'

	import Dimensions from '../Dimenions/Dimension'
	import messages from './messages'
	export default {
		name: 'LogistForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert, Dimensions },
		data() {
			return {
				form: {
					id: null,
					client: null,
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
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Logists.getLogist(this.id, (result) => {
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
					Logists.updateLogist(this.form, (result) => {
						this.alert = {
							title: 'Salvar Usuário',
							message: result.status,
						}
					})
				} else {
					Logists.insertLogist(this.form, (result) => {
						console.log(result)
					})
				}
			},
		},
	}
</script>
