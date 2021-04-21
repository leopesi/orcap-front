<template>
	<div class="login">
		<h1>LOGIN</h1>
		<div class="form">
			<form>
				<div class="form-control">
					<label>{{ $t('email') }}</label>
					<input v-model="mail" type="mail" />
				</div>
				<div class="form-control">
					<label>Senha</label>
					<input v-model="password" type="password" />
				</div>
				<div class="form-control">
					<button @click="login">Entrar</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	import messages from './messages'
	import './style.css'

	export default {
		name: 'Login',
		i18n: { messages },
		data() {
			return {
				mail: '',
				password: ''
			}
		},
		methods: {
			login() {
				axios.get('/login?mail='+this.mail+'&password='+this.password)
				.then(response => {
					if (response && response.data && response.data.token) {
						localStorage.token = response.data.token
						localStorage.userType = response.data.type
						this.$router.push('/home')
					} else {
						alert('Login inválido')
					}
				})
			}
		}
	}
</script>
