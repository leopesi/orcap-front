<template>
	<div>
		<FloatCard :title="$t('default_formats')" :show="this.show" @close="$emit('close')">
			<div class="row">
				<div class="col-sm-12">
					<div class="row">
						<div class="col-sm-6" v-for="(item, i) in this.formats" :key="i">
							<img class="format-image" :src="'http://localhost:3333/img/formats/' + item.image" @click="selectedFormat(item)"/>
						</div>
					</div>
				</div>
			</div>
		</FloatCard>
	</div>
</template>

<script>
	import Formats from '../../../../controllers/basics/formats'
	import FloatCard from '../../../components/FloatCard/FloatCard.vue'
	import messages from '../BudgetForm/messages'

	export default {
		name: 'Dimensions',
		components: { FloatCard },
		props: { show: Boolean },
		i18n: { messages },
		data() {
			return {
				formats: null,
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			load() {
				Formats.list((result) => {
					this.formats = result.data
				})
			},
            selectedFormat(format) {
                this.$emit('selected', format)
            }
		},
	}
</script>
