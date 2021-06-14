<template>
	<div class="login">
		<div class="card mx-auto" style="width: 400px">
			<div class="card-header">LOGIN</div>
			<div class="card-body">
				<form class="form">
					<div class="form-group">
						<label for="mail">{{ $t('email') }}</label>
						<input class="form-control" id="mail" v-model="mail" type="mail" />
					</div>
					<div class="form-group">
						<label for="password">Senha</label>
						<input class="form-control" id="password" v-model="password" type="password" />
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="row">
					<div class="col-sm-6">
						<button type="button" class="btn btn-primary" @click="login">
							{{ $t('signin') }}
						</button>
					</div>
					<div class="col-sm-6 text-right">
						<button type="button" class="btn btn-secondary" @click="newLogist">
							{{ $t('signup') }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Sessions from '../../../../controllers/persons/sessions'
	import Methods from '../../../../helpers/methods'
	import messages from './messages'
	import './style.css'

	export default {
		name: 'Login',
		i18n: { messages },
		data() {
			return {
				mail: '',
				password: '',
			}
		},
		methods: {
			login() {
				Sessions.login(this.mail, this.password, (result) => {
					if (result) {
						Methods.openPage(this, 'home')
					} else {
						alert('Login inválido')
					}
				})
			},
			newLogist() {
				Methods.openPage(this, 'logists/0', false)
			},
		},
	}
</script>
