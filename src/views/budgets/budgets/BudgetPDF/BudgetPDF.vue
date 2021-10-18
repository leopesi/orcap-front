<template>
	<div class="pdf-page" v-if="this.budget">
		<div class="row">
			<div class="col-6">
				<div>{{ this.budget.logists.street }}, {{ this.budget.logists.number }}, {{ this.budget.logists.neighborhood }}</div>
				<div>{{ this.budget.logists.city }} / {{ this.budget.logists.state }} CEP: {{ this.budget.logists.zipcode }}</div>
				<div>Fone: {{ this.budget.logists.city }} Fax: {{ this.budget.logists.fax }}</div>
				<div>{{ this.budget.logists.website }}</div>
				<div>{{ this.budget.logists.logists_sessions.sessions.mail }}</div>
			</div>
		</div>
		<div class="row pt-5">
			<div class="col-12 text-right">
				<div>{{ this.budget.logists.city }}, {{ this.dateString }}</div>
			</div>
		</div>
		<div class="row pt-2">
			<div class="col-12 text-left">
				<div>Cotação: {{ this.budget_id }} | Validade da proposta: data_vencimento</div>
			</div>
		</div>
		<div class="row pt-2">
			<div class="col-12 text-left">
				<div>Local de instalação: {{ this.budget.logists.city }}, {{ this.budget.logists.neighborhood }}, {{ this.budget.logists.street }} {{ this.budget.logists.number }}</div>
			</div>
		</div>
		<div class="row pt-4">
			<div class="col-12 text-center">
				<div class="h4">Orçamento de construção</div>
			</div>
		</div>
		<div class="row pt-4">
			<div class="col-12 text-left">
				<div>Cliente {{ this.budget.clients.name }},</div>
			</div>
		</div>
		<div class="row pt-3">
			<div class="col-12 text-left">
				<div>
					Atento à sua solicitação, apresentamos orçamento para construção, sem mão de obra, de piscina de alvenaria, revestida com vinil {{ this.budget.thickness }} mm de espessura,
					<span v-if="this.budget.steps">para uma piscina com {{ this.budget.number_steps }} patamares, </span>
					medindo ({{ this.budget.length }}) metros de comprimento por ({{ this.budget.width }}) metros de largura, por ({{ this.budget.medium_depth }}) metros de profundidade média
					<span v-if="this.budget.beach">e prainha externa medindo ({{ this.budget.beach_length }}) x ({{ this.budget.beach_width }}) x ({{ this.budget.beach_medium_depth }}).</span>
				</div>
			</div>
		</div>
		<div class="row pt-4">
			<div class="col-12 text-left title-pdf-blue">
				<div>Incluso no orçamento</div>
			</div>
		</div>
		<div class="row pt-4">
			<div class="col-12 text-left">
				<ul>
					<li>Fornecimento e instalação de bolsão de vinil com perfil de sustentação e isomanta no fundo;</li>
					<span v-for="(item, i) in this.budget.equipments" :key="i">
						<li v-if="item.type == 'filters'">
							Fornecimento e instalação de 1 filtro ({{ item.equipment.name }}), marca: ({{ item.equipment.brands.name }})
							<!-- , com (quant.) sacos de areia; -->
						</li>
						<li v-if="item.type == 'engines'">Fornecimento e instalação de 1 motobomba ({{ item.equipment.name }}), marca: ({{ item.equipment.brands.name }})</li>
						<!-- <li>Fornecimento e instalação de (quant.) tampa da casa de máquinas, (modelo), marca: (marca);</li>
						-->
					</span>
					<!-- construction_labor: DataTypes.DECIMAL(10, 2),
					excavation_labor: DataTypes.DECIMAL(10, 2),
					earth_removal_labor: DataTypes.DECIMAL(10, 2),
					short_wall_labor: DataTypes.DECIMAL(10, 2),
					subfloor_labor: DataTypes.DECIMAL(10, 2),
					material_placement_labor: DataTypes.DECIMAL(10, 2),
					reserve: DataTypes.DECIMAL(10, 2),
					art: DataTypes.DECIMAL(10, 2),
					job_monitoring_fee: DataTypes.DECIMAL(10, 2), -->

					<li v-if="this.budget['excavation_labor']">Mão de obra de escavação do buraco;</li>
					<li v-if="this.budget['earth_removal_labor']">Mão de obra de remoção da terra escavada até a caçamba;</li>
					<li v-if="this.budget['subfloor_labor']">Mão de obra de construção de {{ this.budget.sidewalk_area }} metros de contrapiso rústico ao redor da piscina;</li>
					<li v-if="this.budget['construction_labor']">Mão de obra de construção da alvenaria da piscina e da casa de máquinas;</li>
					<li v-if="this.budget['material_placement_labor']">Mão de obra de instalação da hidráulica e da elétrica entre a piscina e a casa de máquinas;</li>
					<li v-if="this.budget['short_wall_labor']">Mão de obra de construção de 00 (Verificar) metros de mureta;</li>
					<li v-if="this.budget['material_placement_labor']">Mão de obra de colocação de materiais;</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left title-pdf-blue">
				<div>Não incluso no orçamento</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left">
				<ul>
					<li>Material de construção (Alvenaria, hidráulico e elétrica);</li>
					<li>Água para enchimento da piscina (caminhão pipa);</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left title-pdf-blue">
				<div>Formas de pagamento</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left">
				<ul>
					<li>Valor: R$ 20.818,31</li>
					<li>Desconto: R$ 200,00</li>
					<li>Total: R$ 20.618,31</li>
					<li>Forma de Pagamento: Entrada a vista de R$ 1.000,00 + 4 parcelas de R$ 4.904,58</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left title-pdf-blue">
				<div>Prazo de Entrega</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left">
				<ul>
					<li>{{ this.budget.deadline_days }} dias úteis após a assinatura contrato.</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-left">
				Atenciosamente,
			</div>
			<div class="col-12 text-left">
				{{ this.budget.sellers.name }}
			</div>
		</div>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import Budgets from '../../../../controllers/budgets/budgets'

	import './style.css'

	export default {
		props: { budget_id: String },
		data() {
			return {
				budget: null,
				dateString: '',
			}
		},
		mounted() {
			this.load()
			this.createDateString()
		},
		methods: {
			load() {
				if (this.budget_id) {
					Budgets.getBudget(this.budget_id, (result) => {
						this.budget = Object.assign({}, result.data)
						if (result.data) {
							this.budget.expiration_date = Methods.fixSequelizeOnlyDate(this.budget.expiration_date)
							this.budget.updatedAt = Methods.fixSequelizeDate(this.budget.updatedAt)
							this.budget.createdAt = Methods.fixSequelizeDate(this.budget.createdAt)
						}
						const length = Methods.fixNumber(this.budget.length)
						const width = Methods.fixNumber(this.budget.width)
						const beach_length = Methods.fixNumber(this.budget.beach_length)
						const beach_width = Methods.fixNumber(this.budget.beach_width)
						const perimeter = length * 2 + width * 2 - beach_length
						const beach_perimeter = beach_length + beach_width * 2
						const sidewalk_width = Methods.fixNumber(this.budget.sidewalk_width)
						this.budget.sidewalk_area = (perimeter + beach_perimeter) * sidewalk_width + sidewalk_width * sidewalk_width * 4
						console.log(this.budget)
					})
				}
			},
			createDateString() {
				const myDate = new Date()
				const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
				const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
				this.dateString = days[myDate.getDay()] + ', ' + myDate.getDate() + ' de ' + months[myDate.getMonth()] + ' de ' + myDate.getFullYear()
			},
		},
	}
</script>
