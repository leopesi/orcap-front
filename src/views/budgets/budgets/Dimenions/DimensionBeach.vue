<template>
	<div class="card" v-if="this.form">
		<div class="card-header">
			{{ $t('dimensions_beach') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="width">{{ $t('width') }}</label>
						<input class="form-control" id="width" v-model="form.beach_width" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="initial_depth">{{ $t('initial_depth') }}</label>
						<input class="form-control" id="initial_depth" v-model="form.beach_initial_depth" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="final_depth">{{ $t('final_depth') }}</label>
						<input class="form-control" id="final_depth" v-model="form.beach_final_depth" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="perimeter">{{ $t('perimeter') }}</label>
						<input class="form-control" id="perimeter" v-model="form.beach_perimeter" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="medium_depth">{{ $t('medium_depth') }}</label>
						<input class="form-control" id="medium_depth" v-model="form.beach_medium_depth" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_facial">{{ $t('m2_facial') }}</label>
						<input class="form-control" id="m2_facial" v-model="form.beach_m2_wall" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_facial">{{ $t('m2_facial') }}</label>
						<input class="form-control" id="m2_facial" v-model="form.beach_m2_facial" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_total">{{ $t('m2_total') }}</label>
						<input class="form-control" id="m2_total" v-model="form.beach_m2_total" type="text" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3_total">{{ $t('m3_total') }}</label>
						<input class="form-control" id="m3_total" v-model="form.beach_m3_total" type="text" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import Dimensions from '../../../../controllers/budgets/dimensions'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				interval: null,
				showSteps: null,
			}
		},
		mounted() {
			this.calculate()
			setTimeout(() => {
				this.showSteps = this.form.steps ? 'true' : 'false'
			}, 100)
		},
		methods: {
			calculate() {
				// if (this.interval) clearInterval(this.interval)
				// if (this.form) {
				// 	this.form.perimeter = this.$t('loading')
				// 	this.form.medium_depth = this.$t('loading')
				// 	this.form.sidewalk_area = this.$t('loading')
				// 	this.form.m2_facial = this.$t('loading')
				// 	this.form.m2_wall = this.$t('loading')
				// 	this.form.m2_total = this.$t('loading')
				// 	this.form.m3_total = this.$t('loading')
				// 	this.form.m3_real = this.$t('loading')
				// 	this.interval = setInterval(() => {
				// 		this.$emit('change')
				// 		Dimensions.calculate(this.form, (result) => {
				// 			if (result.dimension) {
				// 				this.form.perimeter = this.form.perimeter > 0 ? this.form.perimeter : parseFloat(result.dimension.perimeter).toFixed(2)
				// 				this.form.medium_depth = parseFloat(result.dimension.medium_depth).toFixed(2)
				// 				this.form.sidewalk_area = parseFloat(result.dimension.sidewalk_area).toFixed(2)
				// 				this.form.m2_facial = parseFloat(result.dimension.m2_facial).toFixed(2)
				// 				this.form.m2_wall = parseFloat(result.dimension.m2_wall).toFixed(2)
				// 				this.form.m2_total = parseFloat(result.dimension.m2_total).toFixed(2)
				// 				this.form.m3_total = parseFloat(result.dimension.m3_total).toFixed(2)
				// 				this.form.m3_real = parseFloat(result.dimension.m3_real).toFixed(2)

				// 				this.form.perimeter = !isNaN(this.form.perimeter) ? this.form.perimeter : 0
				// 				this.form.medium_depth = !isNaN(this.form.medium_depth) ? this.form.medium_depth : 0
				// 				this.form.sidewalk_area = !isNaN(this.form.sidewalk_area) ? this.form.sidewalk_area : 0
				// 				this.form.m2_facial = !isNaN(this.form.m2_facial) ? this.form.m2_facial : 0
				// 				this.form.m2_wall = !isNaN(this.form.m2_wall) ? this.form.m2_wall : 0
				// 				this.form.m2_total = !isNaN(this.form.m2_total) ? this.form.m2_total : 0
				// 				this.form.m3_total = !isNaN(this.form.m3_total) ? this.form.m3_total : 0
				// 				this.form.m3_real = !isNaN(this.form.m3_real) ? this.form.m3_real : 0
				// 				this.$emit('changed')
				// 			}
				// 		})
				// 		clearInterval(this.interval)
				// 	}, 1000)
				// }
			},
		},
	}
</script>
