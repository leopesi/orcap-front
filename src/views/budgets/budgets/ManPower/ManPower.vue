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
						<input class="form-control" :id="field" type="text" v-model="form[field]"/>
					</div>
				</div>
				<!-- <div class="col-sm-3">
					<div class="form-group">
						<label for="construction_labor">{{ $t('construction_labor') }}</label>
						<input class="form-control" id="construction_labor" type="text" v-model="form.construction_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="excavation_labor">{{ $t('excavation_labor') }}</label>
						<input class="form-control" id="excavation_labor" type="text" v-model="form.excavation_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="earth_removal_labor">{{ $t('earth_removal_labor') }}</label>
						<input class="form-control" id="earth_removal_labor" type="text" v-model="form.earth_removal_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="short_wall_labor">{{ $t('short_wall_labor') }}</label>
						<input class="form-control" id="short_wall_labor" type="text" v-model="form.short_wall_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="subfloor_labor">{{ $t('subfloor_labor') }}</label>
						<input class="form-control" id="subfloor_labor" type="text" v-model="form.subfloor_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="material_placement_labor">{{ $t('material_placement_labor') }}</label>
						<input class="form-control" id="material_placement_labor" type="text" v-model="form.material_placement_labor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="reserve">{{ $t('reserve') }}</label>
						<input class="form-control" id="reserve" type="text" v-model="form.reserve" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="art">{{ $t('art') }}</label>
						<input class="form-control" id="art" type="text" v-model="form.art" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="job_monitoring_fee">{{ $t('job_monitoring_fee') }}</label>
						<input class="form-control" id="job_monitoring_fee" type="text" v-model="form.job_monitoring_fee" />
					</div>
				</div> -->
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
		props: { form: Object, layout: String },
		i18n: { messages },
		data() {
			return {
				manpowers: [],
			}
		},
		watch: {
			layout() {
				console.log('MAN CHANGE FORM')
				this.manpowers = Layouts[this.layout] ? Layouts[this.layout].manpowers : []
			},
		},
		mounted() {},
		methods: {},
	}
</script>
