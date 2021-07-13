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
	import Providers from '../../../../controllers/basics/providers'

	import messages from './messages'
	export default {
		name: 'ProviderForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				providers: [],
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id && this.id != 0) {
					Providers.get(this.id, (provider) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: provider.data.name
						}
					})
				}
				Providers.list((providers) => {
					this.providers = providers.data
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Providers.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Marca',
							message: result.status + '<br/>' + result.error,
						}
					})
				} else {
					Providers.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Marca',
							message: result.status + '<br/>' + result.error,
						}
						this.id = result.data.id
						this.form.id = result.data.id
						window.location.hash = 'providers/' + result.data.id
					})
				}
			},
		},
	}
</script>
