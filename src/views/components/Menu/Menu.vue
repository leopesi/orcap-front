<template>
	<div class="menu navbar-expand-lg navbar-dark" v-if="this.show">
		<div class="container-fluid">
			<div class="navbar-toggler">
				<span class="navbar-toggler-icon"></span>
			</div>
			<div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
				<ul class="navbar-nav">
					<li class="nav-item dropdown" @click="open('home')">
						<div class="nav-link" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							{{ $t('home') }}
						</div>
					</li>
					<li class="nav-item dropdown" v-for="(header, i) in this.menus" :key="i">
						<div class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							{{ $t(i) }}
							<div>
								<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
									<li @click="open(menu)" v-for="(menu, j) in header" :key="j">
										<a class="dropdown-item">
											{{ $t(j) }}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Methods from '../../../helpers/methods'
	import Menus from './menus'
	import messages from './messages'
	import './style.css'
	export default {
		name: 'Menu',
		i18n: { messages },
		data() {
			return {
				menus: Menus,
				actual: Object.keys(Menus)[0],
				show: localStorage.userType ? true : false,
			}
		},
		mounted() {
			this.show = localStorage.userType ? true : false
			this.actual = localStorage.selectedMenu
		},
		methods: {
			open(page) {
				Methods.openPage(this, page)
			},
			changeMenu(menu) {
				localStorage.selectedMenu = menu
				this.actual = menu
			},
		},
	}
</script>
