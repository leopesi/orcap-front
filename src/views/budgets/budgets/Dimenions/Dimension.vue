<template>
	<div class="card" v-if="this.form">
		<div class="card-header">
			{{ $t('dimensions') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="length">{{ $t('length') }}</label>
						<input
							class="form-control"
							id="length"
							v-model="form.length"
							type="number"
							step="0.01"
							@keyup="calculate"
						/>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="width">{{ $t('width') }}</label>
						<input class="form-control" id="width" v-model="form.width" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="m2_facial">{{ $t('m2_facial') }}</label>
						<input class="form-control" id="m2_facial" v-model="form.m2_facial" type="text" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="initial_depth">{{ $t('initial_depth') }}</label>
						<input
							class="form-control"
							id="initial_depth"
							v-model="form.initial_depth"
							type="number"
							step="0.01"
							@keyup="calculate"
						/>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="final_depth">{{ $t('final_depth') }}</label>
						<input
							class="form-control"
							id="final_depth"
							v-model="form.final_depth"
							type="number"
							step="0.01"
							@keyup="calculate"
						/>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="average_depth">{{ $t('average_depth') }}</label>
						<input class="form-control" id="average_depth" v-model="form.average_depth" type="text" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="sidewalk_width">{{ $t('sidewalk_width') }}</label>
						<input
							class="form-control"
							id="sidewalk_width"
							v-model="form.sidewalk_width"
							type="number"
							step="0.01"
							@keyup="calculate"
						/>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="sidewalk_area">{{ $t('sidewalk_area') }}</label>
						<input class="form-control" id="sidewalk_area" v-model="form.sidewalk_area" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="perimeter">{{ $t('perimeter') }}</label>
						<input class="form-control" id="perimeter" v-model="form.perimeter" type="text" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_wall">{{ $t('m2_wall') }}</label>
						<input class="form-control" id="m2_wall" v-model="form.m2_wall" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_total">{{ $t('m2_total') }}</label>
						<input class="form-control" id="m2_total" v-model="form.m2_total" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3_total">{{ $t('m3_total') }}</label>
						<input class="form-control" id="m3_total" v-model="form.m3_total" type="text" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3_real">{{ $t('m3_real') }}</label>
						<input class="form-control" id="m3_real" v-model="form.m3_real" type="text" disabled />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Dimensions from '../../../../controllers/budgets/dimensions'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {
				interval: null,
			}
		},
		mounted() {
			this.calculate()
		},
		methods: {
			calculate() {
				if (this.interval) clearInterval(this.interval)
				this.form.perimeter = this.$t('loading')
				this.form.average_depth = this.$t('loading')
				this.form.sidewalk_area = this.$t('loading')
				this.form.m2_facial = this.$t('loading')
				this.form.m2_wall = this.$t('loading')
				this.form.m2_total = this.$t('loading')
				this.form.m3_total = this.$t('loading')
				this.form.m3_real = this.$t('loading')
				this.interval = setInterval(() => {
					Dimensions.calculate(this.form, (result) => {
						this.form.perimeter = parseFloat(result.dimension.perimeter).toFixed(2)
						this.form.average_depth = parseFloat(result.dimension.average_depth).toFixed(2)
						this.form.sidewalk_area = parseFloat(result.dimension.sidewalk_area).toFixed(2)
						this.form.m2_facial = parseFloat(result.dimension.m2_facial).toFixed(2)
						this.form.m2_wall = parseFloat(result.dimension.m2_wall).toFixed(2)
						this.form.m2_total = parseFloat(result.dimension.m2_total).toFixed(2)
						this.form.m3_total = parseFloat(result.dimension.m3_total).toFixed(2)
						this.form.m3_real = parseFloat(result.dimension.m3_real).toFixed(2)

						this.form.perimeter = !isNaN(this.form.perimeter) ? this.form.perimeter : 0
						this.form.average_depth = !isNaN(this.form.average_depth) ? this.average_depth.perimeter : 0
						this.form.sidewalk_area = !isNaN(this.form.sidewalk_area) ? this.form.sidewalk_area : 0
						this.form.m2_facial = !isNaN(this.form.m2_facial) ? this.form.m2_facial : 0
						this.form.m2_wall = !isNaN(this.form.m2_wall) ? this.form.m2_wall : 0
						this.form.m2_total = !isNaN(this.form.m2_total) ? this.form.m2_total : 0
						this.form.m3_total = !isNaN(this.form.m3_total) ? this.form.m3_total : 0
						this.form.m3_real = !isNaN(this.form.m3_real) ? this.form.m3_real : 0
					})
					clearInterval(this.interval)
				}, 1000)
			},
		},
	}
</script>
