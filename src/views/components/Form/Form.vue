<template>
	<div class="list">
		<table>
			<tr>
				<td>
					<slot name="header"/>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	
	import messages from './messages'
	import './style.css'
	export default {
		name: 'List',
		i18n: { messages },
		mounted() {},
		methods: {
		},
	}
</script>
