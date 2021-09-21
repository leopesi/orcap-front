export default {
	logist_manpower: {
		name: 'Construção de piscina com mão de obra da loja',
		equipments: ['filters', 'engines', 'lids', 'sands', 'blankets', 'profiles', 'vinyls'],
		manpowers: ['construction_labor', 'excavation_labor', 'earth_removal_labor', 'short_wall_labor', 'subfloor_labor', 'material_placement_labor', 'reserve'],
	},
	client_manpower: {
		name: 'Construção de piscina com mão de obra do cliente',
		equipments: ['filters', 'engines', 'lids', 'sands', 'blankets', 'profiles', 'vinyls'],
		manpowers: ['job_monitoring_fee', 'reserve'],
	},
	vinyl_change: {
		name: 'Troca de vinil',
		equipments: ['blankets', 'profiles', 'vinyls'],
		manpowers: ['reserve'],
	},
	vinyl_install: {
		name: 'Instalação de vinil em piscina de ajulejo',
		equipments: ['blankets', 'profiles', 'vinyls'],
		manpowers: ['job_monitoring_fee', 'reserve'],
	},
}
