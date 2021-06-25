<template>
	<div class="card">
		<div class="card-header">
			{{ $t('manpower') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-3" v-for="(field, i) in this.manpowers" :key="i">
					<div class="form-group">
						<label :for="field">{{ $t(field) }}</label>
						<input class="form-control" :id="field" type="text" v-model="form[field]" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import messages from '../BudgetForm/messages'
	import Layouts from '../data/layouts'

	export default {
		name: 'ManPower',
		components: {},
		props: { form: Object, layout: String, logist: Object },
		i18n: { messages },
		data() {
			return {
				manpowers: [],
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
					this.form[this.manpowers[i]] = this.logist[this.manpowers[i]]
				}
			},
		},
	}
</script>
