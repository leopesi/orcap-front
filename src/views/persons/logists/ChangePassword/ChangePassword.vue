<template>
	<div class="home">
		<Form @save="save" :size="'medium'">
			<div slot="title">
				{{ $t('change_password') }}
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="actual_password">{{ $t('actual_password') }}</label>
						<input
							class="form-control"
							id="actual_password"
							v-model="form.actual_password"
							type="password"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="new_password">{{ $t('new_password') }}</label>
						<input class="form-control" id="new_password" v-model="form.new_password" type="password" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="re_new_password">{{ $t('re_new_password') }}</label>
						<input
							class="form-control"
							id="re_new_password"
							v-model="form.re_new_password"
							type="password"
						/>
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
	import Logists from '../../../../controllers/persons/logists'

	import messages from './messages'
	export default {
		name: 'ChangePassword',
		i18n: { messages },
		components: { Form, Alert },
		data() {
			return {
				form: {},
				alert: {},
			}
		},
		mounted() {},
		methods: {
			save() {
				if (this.form.new_password == this.form.re_new_password) {
					Logists.changePassword(this.form, (result) => {
						this.alert = {
							title: 'Alterar Senha',
							message: result.status,
						}
					})
				} else {
					this.alert = {
						title: 'Error',
						message: 'Erro ao alterar senha',
					}
				}
			},
		},
	}
</script>
