<template>
	<div>
		<Card v-if="this.form">
			<div class="card-header">
				{{ $t('dimensions_pool') }}
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-sm-2">
						<div class="form-group">
							<label for="length">{{ $t('length') }}</label>
							<input class="form-control" id="length" v-model="form.length" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="width">{{ $t('width') }}</label>
							<input class="form-control" id="width" v-model="form.width" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="initial_depth">{{ $t('initial_depth') }}</label>
							<input class="form-control" id="initial_depth" v-model="form.initial_depth" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="final_depth">{{ $t('final_depth') }}</label>
							<input class="form-control" id="final_depth" v-model="form.final_depth" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="sidewalk_width">{{ $t('sidewalk_width') }}</label>
							<input class="form-control" id="sidewalk_width" v-model="form.sidewalk_width" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="sidewalk_area">{{ $t('sidewalk_area') }}</label>
							<input class="form-control" id="sidewalk_area" v-model="form.sidewalk_area" step="0.01" type="number" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="perimeter">{{ $t('perimeter') }} *</label>
							<input class="form-control" id="perimeter" v-model="form.perimeter" step="0.01" type="number" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="medium_depth">{{ $t('medium_depth') }}</label>
							<input class="form-control" id="medium_depth" v-model="form.medium_depth" type="number" step="0.01" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="m2_wall">{{ $t('m2_wall') }} *</label>
							<input class="form-control" id="m2_wall" v-model="form.m2_wall" type="number" step="0.01" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="m2_facial">{{ $t('m2_facial') }} *</label>
							<input class="form-control" id="m2_facial" v-model="form.m2_facial" type="number" step="0.01" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="m2_total">{{ $t('m2_total') }} *</label>
							<input class="form-control" id="m2_total" v-model="form.m2_total" type="number" step="0.01" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="m3_total">{{ $t('m3_total') }} *</label>
							<input class="form-control" id="m3_total" v-model="form.m3_total" type="number" step="0.01" />
						</div>
					</div>
					<div class="col-sm-2">
						<div class="form-group">
							<label for="thickness">{{ $t('thickness') }} *</label>
							<select class="form-control custom-select" id="thickness" v-model="form.thickness">
								<option value="0,6">0,6</option>
								<option value="0,7">0,7</option>
								<option value="0,8">0,8</option>
							</select>
						</div>
					</div>
					<div class="col-sm-2">
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
					<div class="col-sm-2">
						<div class="form-group">
							<label for="steps">{{ $t('steps') }}</label>
							<select class="form-control custom-select" id="steps" v-model="form.steps" @change="showSteps = $event.target.value">
								<option :value="false">{{ $t('no') }}</option>
								<option :value="true">{{ $t('yes') }}</option>
							</select>
						</div>
					</div>
					<div class="col-sm-2" v-if="this.showSteps == 'true'">
						<div class="form-group">
							<label for="number_steps">{{ $t('number_steps') }}</label>
							<input class="form-control" id="number_steps" v-model="form.number_steps" type="number" step="1" />
						</div>
					</div>
					<div class="col-sm-4 pt-4">
						<button type="button" class="btn btn-primary small" @click="showFormats = true">
							{{ $t('default_formats') }}
						</button>
					</div>
				</div>
			</div>
		</Card>
		<Card v-if="this.form && form.beach" class="pt-4">
			<div class="card-header">
				{{ $t('dimensions_beach') }}
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-sm-2">
						<div class="form-group">
							<label for="beach_length">{{ $t('beach_length') }}</label>
							<input class="form-control" id="beach_length" v-model="form.beach_length" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2" v-if="form.beach">
						<div class="form-group">
							<label for="beach_width">{{ $t('beach_width') }}</label>
							<input class="form-control" id="beach_width" v-model="form.beach_width" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2" v-if="form.beach">
						<div class="form-group">
							<label for="beach_medium_depth">{{ $t('beach_medium_depth') }}</label>
							<input class="form-control" id="beach_medium_depth" v-model="form.beach_medium_depth" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2" v-if="form.beach">
						<div class="form-group">
							<label for="beach_m2_wall">{{ $t('beach_m2_wall') }} *</label>
							<input class="form-control" id="beach_m2_wall" v-model="form.beach_m2_wall" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
					<div class="col-sm-2" v-if="form.beach">
						<div class="form-group">
							<label for="beach_perimeter">{{ $t('beach_perimeter') }} *</label>
							<input class="form-control" id="beach_perimeter" v-model="form.beach_perimeter" type="number" step="0.01" @keyup="calculate" />
						</div>
					</div>
				</div>
			</div>
		</Card>
		<Formats :show="this.showFormats" @close="showFormats = false" @selected="selectedFormat" />
	</div>
</template>

<script>
	import Formats from './Formats'
	import Methods from '../../../../helpers/methods'
	import Card from '../../../components/Card/Card'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		components: { Card, Formats },
		props: { form: Object, beach: Boolean },
		i18n: { messages },
		data() {
			return {
				interval: null,
				showSteps: null,
				showFormats: false,
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
				const length = Methods.fixNumber(this.form.length)
				const width = Methods.fixNumber(this.form.width)
				const initial_depth = Methods.fixNumber(this.form.initial_depth)
				const final_depth = Methods.fixNumber(this.form.final_depth)
				const medium_depth = Methods.fixNumber(this.form.medium_depth)
				const beach_length = Methods.fixNumber(this.form.beach_length)
				const beach_width = Methods.fixNumber(this.form.beach_width)
				const beach_medium_depth = Methods.fixNumber(this.form.beach_medium_depth)
				const perimeter = length * 2 + width * 2 - beach_length
				const sidewalk_width = Methods.fixNumber(this.form.sidewalk_width)
				const beach_perimeter = beach_length + beach_width * 2
				const beach_m2_wall = beach_perimeter * beach_medium_depth
				const m2_facial = length * width + beach_length * beach_width
				const m2_wall = perimeter * medium_depth + (medium_depth - beach_medium_depth) * beach_length
				const m2_total = m2_wall + beach_m2_wall + m2_facial
				const m3_total = length * width * medium_depth + beach_length * beach_width * beach_medium_depth
				this.form.medium_depth = Methods.fixNumber((initial_depth + final_depth) / 2).toFixed(2)
				this.form.perimeter = Methods.fixNumber(perimeter).toFixed(2)
				// (Perimetro * Largura da Calçada) + ((Largura da Calçada * Largura da Calçada) * 4)
				this.form.sidewalk_area = (perimeter + beach_perimeter) * sidewalk_width + sidewalk_width * sidewalk_width * 4
				this.form.m2_wall = Methods.fixNumber(m2_wall).toFixed(2)
				this.form.beach_perimeter = Methods.fixNumber(beach_perimeter).toFixed(2)
				this.form.beach_m2_wall = Methods.fixNumber(beach_m2_wall).toFixed(2)
				this.form.m2_facial = Methods.fixNumber(m2_facial).toFixed(2)
				this.form.m2_total = Methods.fixNumber(m2_total).toFixed(2)
				this.form.m3_total = Methods.fixNumber(m3_total).toFixed(2)
			},
			clearBeach() {
				this.form.beach_perimeter = 0
				this.form.beach_m2_wall = 0
				this.form.beach_length = 0
				this.form.beach_width = 0
				this.form.beach_medium_depth = 0
				this.calculate()
			},
			selectedFormat(format) {
				this.form.length = format.length
				this.form.width = format.width
				this.form.initial_depth = format.initial_depth
				this.form.final_depth = format.final_depth
				this.form.beach = false
				if (format.beach_length && !isNaN(format.beach_length) && parseFloat(format.beach_length) > 0) {
					this.form.beach_length = format.beach_length
					this.form.beach_width = format.beach_width
					this.form.beach_medium_depth = format.beach_medium_depth
					this.form.beach = true
				}
				this.form.format_id = format.id
				this.calculate()
				this.showFormats = false
				setTimeout(() => {
					this.calculate()
				}, 100)
			},
		},
	}
</script>
