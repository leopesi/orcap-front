<template>
	<Card v-if="this.form">
		<div class="card-header">
			{{ $t('dimensions_pool') }}
		</div>
		<div class="card-body" id="multiCollapseExample1">
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="length">{{ $t('length') }}</label>
						<input class="form-control" id="length" v-model="form.length" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="width">{{ $t('width') }}</label>
						<input class="form-control" id="width" v-model="form.width" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="initial_depth">{{ $t('initial_depth') }}</label>
						<input class="form-control" id="initial_depth" v-model="form.initial_depth" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="final_depth">{{ $t('final_depth') }}</label>
						<input class="form-control" id="final_depth" v-model="form.final_depth" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="sidewalk_width">{{ $t('sidewalk_width') }}</label>
						<input class="form-control" id="sidewalk_width" v-model="form.sidewalk_width" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="sidewalk_area">{{ $t('sidewalk_area') }}</label>
						<input class="form-control" id="sidewalk_area" v-model="form.sidewalk_area" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="perimeter">{{ $t('perimeter') }}</label>
						<input class="form-control" id="perimeter" v-model="form.perimeter" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="medium_depth">{{ $t('medium_depth') }}</label>
						<input class="form-control" id="medium_depth" v-model="form.medium_depth" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_wall">{{ $t('m2_wall') }}</label>
						<input class="form-control" id="m2_wall" v-model="form.m2_wall" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_facial">{{ $t('m2_facial') }}</label>
						<input class="form-control" id="m2_facial" v-model="form.m2_facial" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2_total">{{ $t('m2_total') }}</label>
						<input class="form-control" id="m2_total" v-model="form.m2_total" type="number" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3_total">{{ $t('m3_total') }}</label>
						<input class="form-control" id="m3_total" v-model="form.m3_total" type="number" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group mb-3">
						<label for="beach">{{ $t('beach') }}</label>
						<div class="input-group mb-3">
							<select class="form-control custom-select" id="beach" v-model="form.beach" @change="clearBeach">
								<option selected :value="false">{{ $t('no') }}</option>
								<option :value="true">{{ $t('yes') }}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="beach_length">{{ $t('beach_length') }}</label>
						<input class="form-control" id="beach_length" v-model="form.beach_length" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="beach_width">{{ $t('beach_width') }}</label>
						<input class="form-control" id="beach_width" v-model="form.beach_width" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="beach_medium_depth">{{ $t('beach_medium_depth') }}</label>
						<input class="form-control" id="beach_medium_depth" v-model="form.beach_medium_depth" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="beach_m2_wall">{{ $t('beach_m2_wall') }}</label>
						<input class="form-control" id="beach_m2_wall" v-model="form.beach_m2_wall" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="beach_perimeter">{{ $t('beach_perimeter') }}</label>
						<input class="form-control" id="beach_perimeter" v-model="form.beach_perimeter" type="number" step="0.01" @keyup="calculate" />
					</div>
				</div>
				<div class="col-sm-3" v-if="form.beach">
					<div class="form-group">
						<label for="steps">{{ $t('steps') }}</label>
						<select class="form-control custom-select" id="steps" v-model="form.steps" @change="showSteps = $event.target.value">
							<option :value="false">{{ $t('no') }}</option>
							<option :value="true">{{ $t('yes') }}</option>
						</select>
					</div>
				</div>
				<div class="col-sm-3" v-if="this.showSteps == 'true'">
					<div class="form-group">
						<label for="number_steps">{{ $t('number_steps') }}</label>
						<input class="form-control" id="number_steps" v-model="form.number_steps" type="text" />
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	// import Dimensions from '../../../../controllers/budgets/dimensions'
	import Card from '../../../components/Card/Card'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		components: { Card },
		props: { form: Object, beach: Boolean },
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
				const length = parseFloat(this.form.length)
				const width = parseFloat(this.form.width)
				const medium_depth = parseFloat(this.form.medium_depth)
				const beach_length = isNaN(parseFloat(this.form.beach_length)) ? 0 : parseFloat(this.form.beach_length)
				const beach_width = isNaN(parseFloat(this.form.beach_width)) ? 0 : parseFloat(this.form.beach_width)
				const beach_medium_depth = isNaN(parseFloat(this.form.beach_medium_depth)) ? 0 : parseFloat(this.form.beach_medium_depth)
				const perimeter = length * 2 + width * 2 - beach_length
				const m2_wall = perimeter * medium_depth + (medium_depth - beach_medium_depth) * beach_length
				const beach_perimeter = beach_length + beach_width * 2
				const beach_m2_wall = beach_perimeter * beach_medium_depth
				const m2_facial = length * width + beach_length * beach_width
				const m2_total = m2_wall + beach_m2_wall + m2_facial
				const m3_total = length * width * medium_depth + beach_length * beach_width * beach_medium_depth
				this.form.perimeter = parseFloat(perimeter).toFixed(2)
				this.form.m2_wall = parseFloat(m2_wall).toFixed(2)
				this.form.beach_perimeter = parseFloat(beach_perimeter).toFixed(2)
				this.form.beach_m2_wall = parseFloat(beach_m2_wall).toFixed(2)
				this.form.m2_facial = parseFloat(m2_facial).toFixed(2)
				this.form.m2_total = parseFloat(m2_total).toFixed(2)
				this.form.m3_total = parseFloat(m3_total).toFixed(2)
			},
			clearBeach() {
				this.form.beach_perimeter = 0
				this.form.beach_m2_wall = 0
				this.form.beach_length = 0
				this.form.beach_width = 0
				this.form.beach_medium_depth = 0
				this.calculate()
			},
		},
	}
</script>
