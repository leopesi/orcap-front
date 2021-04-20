<template>
	<div class="hello">
		<h1>HOME</h1>
	</div>
</template>

<script>
	export default {
		name: 'Login',
    mounted() {
      if (!localStorage.token) this.$router.push('/')
    }
	}
</script>
