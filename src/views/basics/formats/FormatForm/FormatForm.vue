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
	import Formats from '../../../../controllers/basics/formats'

	import messages from './messages'
	export default {
		name: 'FormatForm',
		props: { id: String },
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {
					id: null,
					name: '',
				},
				formats: [],
				alert: {},
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				if (this.id && this.id != 0) {
					Formats.get(this.id, (format) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: format.data.name,
						}
					})
				}
				Formats.list((formats) => {
					this.formats = formats.data
				})
			},
			save() {
				if (this.id && this.id != 0) {
					Formats.update(this.form, (result) => {
						this.alert = {
							title: 'Salvar Formato Padrão',
							message: result.status,
						}
					})
				} else {
					Formats.insert(this.form, (result) => {
						this.alert = {
							title: 'Salvar Formato Padrão',
							message: result.status,
						}
						this.id = result.data.id
						this.form.id = result.data.id
						window.location.hash = 'payments/' + result.data.id
					})
				}
			},
		},
	}
</script>
