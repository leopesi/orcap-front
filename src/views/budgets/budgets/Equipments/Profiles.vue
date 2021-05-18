<template>
	<div class="card">
		<div class="card-header">
			{{ $t('profiles') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="profile">{{ $t('profile') }}</label>
						<select class="custom-select" id="profile" v-model="form.profile" @change="change">
							<option selected>{{ $t('choose') }}</option>
							<option :value="profile.id" v-for="(profile, i) in this.profiles" :key="i">
								{{ profile.equipments.name }}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
					<div class="form-group">
						<label for="description">{{ $t('description') }}</label>
						<input class="form-control" id="description" type="text" :value="this.description" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="cash_price">{{ $t('cash_price') }}</label>
						<input class="form-control" id="cash_price" type="text" :value="this.cash_price" disabled />
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="forward_price">{{ $t('forward_price') }}</label>
						<input class="form-control" id="forward_price" type="text" :value="this.forward_price" disabled />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Equipments from '../../../../controllers/budgets/equipments'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Profiles',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				profiles: [],
				description: '',
				cash_price: 0,
				forward_price: 0,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Equipments.getProfilesByDimension(this.form.dimension, (result) => {
					this.profiles = {}
					for (const i in result.data) {
						this.profiles[result.data[i].id] = result.data[i]
					}
					this.change()
				})
			},
			change() {
				if (this.profiles[this.form.profile]) {
					this.description = this.profiles[this.form.profile].equipments.description
					this.cash_price = this.profiles[this.form.profile].equipments.cash_price
					this.forward_price = this.profiles[this.form.profile].equipments.forward_price
					if (!this.form.equipments) this.form.equipments = {}
					this.form.equipments['profile'] = {
						cash_price: this.profiles[this.form.profile].equipments.cash_price,
						forward_price: this.profiles[this.form.profile].equipments.forward_price,
					}
					this.$emit('changed')
				}
			},
		},
	}
</script>
