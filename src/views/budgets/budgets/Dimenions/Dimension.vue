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
						<input class="form-control" id="length" v-model="form.length" type="number" step="0.01" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="width">{{ $t('width') }}</label>
						<input class="form-control" id="width" v-model="form.width" type="number" step="0.01" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="m2facial">{{ $t('m2facial') }}</label>
						<input class="form-control" id="m2facial" v-model="form.m2facial" type="number" step="0.01" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="initial_depth">{{ $t('initial_depth') }}</label>
						<input class="form-control" id="initial_depth" v-model="form.initial_depth" type="number" step="0.01" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="final_depth">{{ $t('final_depth') }}</label>
						<input class="form-control" id="final_depth" v-model="form.final_depth" type="number" step="0.01" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="average_depth">{{ $t('average_depth') }}</label>
						<input
							class="form-control"
							id="average_depth"
							v-model="form.average_depth"
							type="number"
							step="0.01"
							disabled
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">
						<label for="sidewalk_width">{{ $t('sidewalk_width') }}</label>
						<input class="form-control" id="sidewalk_width" v-model="form.sidewalk_width" type="number" step="0.01" />
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="sidewalk_area">{{ $t('sidewalk_area') }}</label>
						<input
							class="form-control"
							id="sidewalk_area"
							v-model="form.sidewalk_area"
							type="number"
							step="0.01"
							disabled
						/>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="perimeter">{{ $t('perimeter') }}</label>
						<input class="form-control" id="perimeter" v-model="form.perimeter" type="number" step="0.01" disabled />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2wall">{{ $t('m2wall') }}</label>
						<input class="form-control" id="m2wall" v-model="form.m2wall" type="number" step="0.01" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m2total">{{ $t('m2total') }}</label>
						<input class="form-control" id="m2total" v-model="form.m2total" type="number" step="0.01" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3total">{{ $t('m3total') }}</label>
						<input class="form-control" id="m3total" v-model="form.m3total" type="number" step="0.01" disabled />
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label for="m3real">{{ $t('m3real') }}</label>
						<input class="form-control" id="m3real" v-model="form.m3real" type="number" step="0.01" disabled />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		props: { form: Object },
		i18n: { messages },
		data() {
			return {}
		},
		mounted() {},
		methods: {},
	}
</script>
