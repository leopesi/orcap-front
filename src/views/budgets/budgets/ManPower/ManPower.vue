<template>
	<div class="card">
		<div class="card-header">
			{{ $t('manpower') }}
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="side_wall">{{ $t('side_wall') }}</label>
						<input class="form-control" id="side_wall" type="text" v-model="form.side_wall" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="subfloor">{{ $t('subfloor') }}</label>
						<input class="form-control" id="subfloor" type="text" v-model="form.subfloor" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="baldrame">{{ $t('baldrame') }}</label>
						<input class="form-control" id="baldrame" type="text" v-model="form.baldrame" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="mold">{{ $t('mold') }}</label>
						<input class="form-control" id="mold" type="text" v-model="form.mold" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="heating">{{ $t('heating') }}</label>
						<input class="form-control" id="heating" type="text" v-model="form.heating" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="cm_installation">{{ $t('cm_installation') }}</label>
						<input class="form-control" id="cm_installation" type="text" v-model="form.cm_installation" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="vinyl_installation">{{ $t('vinyl_installation') }}</label>
						<input class="form-control" id="vinyl_installation" type="text" v-model="form.vinyl_installation" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="excavation">{{ $t('excavation') }}</label>
						<input class="form-control" id="excavation" type="text" v-model="form.excavation" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="mortar">{{ $t('mortar') }}</label>
						<input class="form-control" id="mortar" type="text" v-model="form.mortar" />
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
						<label for="conduction">{{ $t('conduction') }}</label>
						<input class="form-control" id="conduction" type="text" v-model="form.conduction" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="material_placement">{{ $t('material_placement') }}</label>
						<input class="form-control" id="material_placement" type="text" v-model="form.material_placement" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="earth_removal">{{ $t('earth_removal') }}</label>
						<input class="form-control" id="earth_removal" type="text" v-model="form.earth_removal" />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="art">{{ $t('art') }}</label>
						<input class="form-control" id="art" type="text" v-model="form.art" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import messages from '../BudgetForm/messages'

	export default {
		name: 'ManPower',
		components: {},
		props: { form: Object },
		i18n: { messages },
		data() {
			return {}
		},
		mounted() {},
		methods: {},
	}
</script>
