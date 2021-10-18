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
						<input class="form-control" :id="field" type="text" v-model="form[field]" @keyup="$emit('changed')" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	import Methods from '../../../../helpers/methods'
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
		mounted() {
			setTimeout(() => {
				this.changeLayout(), 100
			})
		},
		watch: {
			layout() {
				console.log('ALTERADO LAYOUT')
				this.changeLayout()
			},
		},
		methods: {
			changeLayout() {
				this.form.construction_labor = null
				this.form.excavation_labor = null
				this.form.earth_removal_labor = null
				this.form.short_wall_labor = null
				this.form.subfloor_labor = null
				this.form.material_placement_labor = null
				this.form.reserve = null
				this.form.art = null
				this.form.job_monitoring_fee = null
				this.manpowers = Layouts[this.layout] ? Layouts[this.layout].manpowers : []
				for (const i in this.manpowers) {
					if (this.manpowers[i] != 'art') {
						if (this.form[this.manpowers[i]]) {
							const value = Methods.fixNumber(this.form[this.manpowers[i]])
							if (value <= 0) this.form[this.manpowers[i]] = this.logist[this.manpowers[i]]
						} else {
							this.form[this.manpowers[i]] = this.logist[this.manpowers[i]]
						}
					}
				}
				this.$emit('changed')
			},
		},
	}
</script>
