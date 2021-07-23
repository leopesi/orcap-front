<template>
	<Card class="card">
		<div class="card-header">
			{{ $t('manpower') }}
		</div>
		<div class="card-body" v-if="this.show">
			<div class="row">
				<div class="col-sm-2" v-for="(field, i) in this.manpowers" :key="i">
					<div class="form-group" v-if="field != 'art'">
						<label :for="field">{{ $t(field) }}</label>
						<input class="form-control" :id="field" type="text" v-model="form[field]" disabled />
					</div>
					<div class="form-group" v-else>
						<label :for="field">{{ $t(field) }}</label>
						<input class="form-control" :id="field" type="text" v-model="form[field]" @keyup="$emit('change')" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	import Card from '../../../components/Card/Card.vue'
	import messages from '../BudgetForm/messages'
	import Layouts from '../data/layouts'

	export default {
		name: 'ManPower',
		components: { Card },
		props: { form: Object, layout: String, logist: Object },
		i18n: { messages },
		data() {
			return {
				manpowers: [],
				show: true,
			}
		},
		mounted() {},
		watch: {
			layout() {
				this.changeLayout()
			},
		},
		methods: {
			changeLayout() {
				this.manpowers = Layouts[this.layout] ? Layouts[this.layout].manpowers : []
				for (const i in this.manpowers) {
					if (this.manpowers[i] != 'art') {
						if (this.form[this.manpowers[i]]) {
							const value = parseFloat(this.form[this.manpowers[i]])
							if (isNaN(value) || value <= 0) this.form[this.manpowers[i]] = this.logist[this.manpowers[i]]
						}
					}
				}
			},
		},
	}
</script>
