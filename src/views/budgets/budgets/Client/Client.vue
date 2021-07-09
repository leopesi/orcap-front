<template>
	<Card>
		<div class="card-header">
			{{ $t('client') }}
		</div>
		<div class="card-body">
			<div class="row" v-if="this.form.client_id">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="id">{{ $t('id') }}</label>
						<input class="form-control" id="id" v-model="form_client.id" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form_client.name" type="text" />
					</div>
				</div>
				<div class="col-sm-6"></div>
			</div>
			<div class="row" v-if="!this.form.client_id">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="document">{{ $t('document') }}</label>
						<input class="form-control" id="document" v-model="form_client.document" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="phone">{{ $t('phone') }}</label>
						<input class="form-control" id="phone" v-model="form_client.phone" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="mail">{{ $t('mail') }}</label>
						<input class="form-control" id="mail" v-model="form_client.mail" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="name">{{ $t('name') }}</label>
						<input class="form-control" id="name" v-model="form_client.name" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="address">{{ $t('address') }}</label>
						<input class="form-control" id="address" v-model="form_client.address" type="text" />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="complement">{{ $t('complement') }}</label>
						<input class="form-control" id="complement" v-model="form_client.complement" type="text" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="city">{{ $t('city') }}</label>
						<input class="form-control" id="city" v-model="form_client.city" type="text" />
					</div>
				</div>
				<div class="col-sm-2">
					<div class="form-group">
						<label for="state">{{ $t('state') }}</label>
						<input class="form-control" id="state" v-model="form_client.state" type="text" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	import Card from '../../../components/Card/Card.vue'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Client',
		components: { Card },
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				form_client: {},
				show: true,
			}
		},
		mounted() {},
		watch: {},
		methods: {},
	}
</script>
