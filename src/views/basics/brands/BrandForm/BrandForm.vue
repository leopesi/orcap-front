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
		<Alert :title="this.alert.title" :message="this.alert.message" :pageback="this.alert.pageback" @close="alert = {}" />
	</div>
</template>

<script>
	import Form from '../../../components/Form/Form'
	import Alert from '../../../components/Alert/Alert'
	import Brands from '../../../../controllers/basics/brands'

	import MessageError from '../../../../helpers/messages-errors'
	import Methods from '../../../../helpers/methods'

	import messages from './messages'
	export default {
		name: 'BrandForm',
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
					Brands.get(this.id, (brand) => {
						this.form = {
							id: this.id && this.id != 0 ? this.id : null,
							name: brand.data.name,
						}
					})
				}
			},
			save() {
				if (this.id && this.id != 0) {
					Brands.update(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title', 'brands')
					})
				} else {
					Brands.insert(this.form, (result) => {
						this.alert = MessageError.getMessage(this, result, 'title')
						if (result.data) {
							Methods.refreshPage(this, 'brands/' + result.data.id, true)
						}
					})
				}
			},
		},
	}
</script>
