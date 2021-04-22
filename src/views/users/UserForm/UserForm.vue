<template>
	<div class="home">
		<Form>
			<div slot="title">
				{{ $t('title') }}
			</div>
			<div class="row">
				<div class="col">
					<div class="form-control">
						<label>{{ $t('id') }}</label>
						<input v-model="form.id" type="text" />
					</div>
				</div>
				<div class="col">
					<div class="form-control">
						<label>{{ $t('name') }}</label>
						<input v-model="form.name" type="text" />
					</div>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
	import Form from '../../components/Form/Form'
	import Users from '../../../controllers/users'

	import messages from './messages'
	export default {
		name: 'UserForm',
		props: { id: String },
		i18n: { messages },
		components: { Form },
		data() {
			return {
				form: {
					id: 0,
					name: '',
				},
			}
		},
		mounted() {
			this.loadItem()
		},
		methods: {
			loadItem() {
				console.log(this.id)
				Users.getUser(this.id, (result) => {
					this.form = result.data
				})
			},
		},
	}
</script>
