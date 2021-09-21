import Vue from 'vue'
import Router from 'vue-router'

import BlanketForm from './blankets/BlanketForm/BlanketForm'
import BlanketList from './blankets/BlanketList/BlanketList'

import FilterForm from './filters/FilterForm/FilterForm'
import FilterList from './filters/FilterList/FilterList'

import EngineForm from './engines/EngineForm/EngineForm'
import EngineList from './engines/EngineList/EngineList'

import LidForm from './lids/LidForm/LidForm'
import LidList from './lids/LidList/LidList'

import SandForm from './sands/SandForm/SandForm.vue'
import SandList from './sands/SandList/SandList.vue'

import ProfileForm from './profiles/ProfileForm/ProfileForm'
import ProfileList from './profiles/ProfileList/ProfileList'

import VinylForm from './vinyls/VinylForm/VinylForm'
import VinylList from './vinyls/VinylList/VinylList'

Vue.use(Router)

export default [
	{ path: '/blankets', component: BlanketList },
	{ path: '/blankets/:id', component: BlanketForm, props: true },

	{ path: '/filters', component: FilterList },
	{ path: '/filters/:id', component: FilterForm, props: true },

	{ path: '/engines', component: EngineList },
	{ path: '/engines/:id', component: EngineForm, props: true },

	{ path: '/lids', component: LidList },
	{ path: '/lids/:id', component: LidForm, props: true },

	{ path: '/sands', component: SandList },
	{ path: '/sands/:id', component: SandForm, props: true },

	{ path: '/profiles', component: ProfileList },
	{ path: '/profiles/:id', component: ProfileForm, props: true },
	
	{ path: '/vinyls', component: VinylList },
	{ path: '/vinyls/:id', component: VinylForm, props: true },
]
