<template>
	<div v-if="this.budget">
		<div class="pdf-page">
			<div class="row" v-if="this.budget.logists">
				<div class="col-6">
					<div>{{ this.budget.logists.street }}, {{ this.budget.logists.number }}, {{ this.budget.logists.neighborhood }}</div>
					<div>{{ this.budget.logists.city }} / {{ this.budget.logists.state }} CEP: {{ this.budget.logists.zipcode }}</div>
					<div>Fone: {{ this.budget.logists.city }} Fax: {{ this.budget.logists.fax }}</div>
					<div>{{ this.budget.logists.website }}</div>
					<div>{{ this.budget.logists.logists_sessions.sessions.mail }}</div>
				</div>
			</div>
			<div class="row pt-5" v-if="this.budget.logists">
				<div class="col-12 text-right">
					<div>{{ this.budget.logists.city }}, {{ this.dateString }}</div>
				</div>
			</div>
			<div class="row pt-2">
				<div class="col-12 text-left">
					<div>Cotação: {{ this.budget_id }} | Validade da proposta: {{ this.budget.expiration_date }}</div>
				</div>
			</div>
			<div class="row pt-2" v-if="this.budget.logists">
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
				<div class="col-12 text-left" v-if="this.budget.clients">
					<div>Cliente {{ this.budget.clients.name }},</div>
				</div>
			</div>
			<div class="row pt-3">
				<div class="col-12 text-left">
					<div v-if="this.budget.layout == 'logist_manpower'">
						Atento à sua solicitação, apresentamos orçamento para construção de piscina de alvenaria, revestida com vinil {{ this.budget.thickness }} mm de espessura,
						<span v-if="this.budget.steps">para uma piscina com {{ this.budget.number_steps }} patamares, </span>
						{{ this.budget.perimeter }} metros de perímetro, {{ this.budget.medium_depth }} metros de profundidade
						média, {{ this.budget.m2_wall }} metros² de paredes e {{ this.budget.m2_facial }} metros² faciais
						<!-- medindo ({{ this.budget.length }}) metros de comprimento por ({{ this.budget.width }}) metros de largura, por ({{ this.budget.medium_depth }}) metros de profundidade média -->
						<span v-if="this.budget.beach">e prainha externa medindo ({{ this.budget.beach_length }}) x ({{ this.budget.beach_width }}) x ({{ this.budget.beach_medium_depth }}).</span>
					</div>
					<div v-else-if="this.budget.layout == 'client_manpower'">
						Atento à sua solicitação, apresentamos orçamento para construção, sem mão de obra, de piscina de alvenaria, revestida com vinil {{ this.budget.thickness }} mm de espessura,
						<span v-if="this.budget.steps">para uma piscina com {{ this.budget.number_steps }} patamares, </span>
						{{ this.budget.perimeter }} metros de perímetro, {{ this.budget.medium_depth }} metros de profundidade
						média, {{ this.budget.m2_wall }} metros² de paredes e {{ this.budget.m2_facial }} metros² faciais
						<span v-if="this.budget.beach">e prainha externa medindo ({{ this.budget.beach_length }}) x ({{ this.budget.beach_width }}) x ({{ this.budget.beach_medium_depth }}).</span>
					</div>
					<div v-else-if="this.budget.layout == 'vinyl_change'">
						Atento à sua solicitação, apresentamos orçamento para substituição do bolsão de vinil com espessura de {{ this.budget.thickness }} mm,
						<span v-if="this.budget.steps">para uma piscina com {{ this.budget.number_steps }} patamares, </span>
						{{ this.budget.perimeter }} metros de perímetro, {{ this.budget.medium_depth }} metros de profundidade
						média, {{ this.budget.m2_wall }} metros² de paredes e {{ this.budget.m2_facial }} metros² faciais
						<span v-if="this.budget.beach">e prainha externa medindo ({{ this.budget.beach_length }}) x ({{ this.budget.beach_width }}) x ({{ this.budget.beach_medium_depth }}).</span>
					</div>
					<div v-else-if="this.budget.layout == 'vinyl_install'">
						Atento à sua solicitação, apresentamos orçamento para adaptação e instalação de bolsão de vinil com espessura {{ this.budget.thickness }} mm em piscina de azulejo para uma piscina,
						<span v-if="this.budget.steps">com {{ this.budget.number_steps }} patamares, </span>
						{{ this.budget.perimeter }} metros de perímetro, {{ this.budget.medium_depth }} metros de profundidade
						média, {{ this.budget.m2_wall }} metros² de paredes e {{ this.budget.m2_facial }} metros² faciais
						<span v-if="this.budget.beach">e prainha externa medindo ({{ this.budget.beach_length }}) x ({{ this.budget.beach_width }}) x ({{ this.budget.beach_medium_depth }}).</span>
					</div>
					<div v-if="this.budget.format_id" class="pt-4 text-center">
						<img class="format-image" :src="'http://localhost:3333/img/formats/' + this.budget.formats.image" />
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
						<span v-for="(item, i) in this.budget.equipments" :key="i">
							<li v-if="item.type == 'filters'">
								Fornecimento e instalação de bolsão de vinil
								{{ item.equipment.brands ? ' da marca ' + item.equipment.brands.name + '' : '' }}
								com perfil de sustentação e isomanta no fundo;
							</li>
							<li v-if="item.type == 'filters'">Fornecimento e instalação de 1 filtro {{ item.equipment.name }} {{ item.equipment.brands ? 'da marca ' + item.equipment.brands.name : '' }}</li>
							<li v-if="item.type == 'sands'">Fornecimento de sacos de areia para filtro {{ item.equipment.name }} {{ item.equipment.brands ? 'da marca ' + item.equipment.brands.name : '' }}</li>
							<li v-if="item.type == 'engines'">Fornecimento e instalação de 1 motobomba {{ item.equipment.name }} {{ item.equipment.brands ? 'da marca ' + item.equipment.brands.name : '' }}</li>
							<li v-if="item.type == 'lids'">
								Fornecimento e instalação de 1 tampa da casa de máquinas {{ item.equipment.name }} {{ item.equipment.brands ? 'da marca ' + item.equipment.brands.name : '' }}
							</li>
						</span>
						<div v-if="this.budget.layout == 'logist_manpower' || this.budget.layout == 'client_manpower'">
							<div class="pt-3 h6">Mão de Obra</div>
							<li v-if="this.budget['excavation_labor']">Mão de obra de escavação do buraco;</li>
							<li v-if="this.budget['earth_removal_labor']">Mão de obra de remoção da terra escavada até a caçamba;</li>
							<li v-if="this.budget['subfloor_labor']">Mão de obra de construção de {{ this.budget.sidewalk_area }} metros de contrapiso rústico ao redor da piscina;</li>
							<li v-if="this.budget['construction_labor']">Mão de obra de construção da alvenaria da piscina e da casa de máquinas;</li>
							<li v-if="this.budget['construction_labor']">Mão de obra de instalação da hidráulica e da elétrica entre a piscina e a casa de máquinas;</li>
							<li v-if="this.budget['short_wall_labor']">Mão de obra de construção de {{ this.budget.short_wall_labor_m2 }} metros de mureta;</li>
							<li v-if="this.budget['material_placement_labor']">Mão de obra de colocação de materiais;</li>
						</div>
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
						<div v-if="this.budget.layout == 'logist_manpower'">
							<li>Material de construção (Alvenaria, hidráulico e elétrica);</li>
							<li>Água para enchimento da piscina (caminhão pipa);</li>
						</div>
						<div v-else-if="this.budget.layout == 'client_manpower'">
							<li>Mão de obra de construção da alvenaria;</li>
							<li>Material de construção (Alvenaria, hidráulico e elétrica);</li>
							<li>Água para enchimento da piscina (caminhão pipa).</li>
						</div>
						<div v-else-if="this.budget.layout == 'vinyl_change'">
							<li>Água para enchimento da piscina (caminhão pipa);</li>
						</div>
						<div v-else-if="this.budget.layout == 'vinyl_install'">
							<li>Mão de obra de construção da alvenaria;</li>
							<li>Material de construção (Alvenaria, hidráulico e elétrica);</li>
							<li>Água para enchimento da piscina (caminhão pipa).</li>
						</div>
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
					<div class="h5 py-2 px-2">
						{{ $t(this.budget.payment) }}
					</div>
					<ul v-if="this.budget.payment == 'in_cash' || this.budget.payment == 'debit_card'">
						<li>Valor: R$ {{ this.budget.cash_price }}</li>
						<li>Desconto: R$ {{ this.budget.discount }}</li>
						<li>Total: R$ {{ this.budget.cash_price_total }}</li>
					</ul>
					<ul v-else-if="this.budget.payment == 'installment_credit_card' || this.budget.payment == 'by_logist' || this.budget.payment == 'by_financial_down_payment'">
						<li>Valor: R$ {{ this.budget.cash_price }}</li>
						<li>Desconto: R$ {{ this.budget.discount }}</li>
						<li>Total: R$ {{ (parseFloat(this.budget.forward_price_total) + parseFloat(this.budget.down_payment)).toFixed(2) }}</li>
						<li>
							<span v-if="this.budget.down_payment && this.budget.down_payment > 0">Entrada a vista de R$ {{ this.budget.down_payment }} + </span>
							{{ this.budget.installment_number }} parcelas de R$ {{ (this.budget.forward_price_total / this.budget.installment_number).toFixed(2) }}
						</li>
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
				<div class="col-12 text-left" v-if="this.budget.sellers">
					{{ this.budget.sellers.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Methods from '../../../../helpers/methods'
	import Budgets from '../../../../controllers/budgets/budgets'
	import messages from '../BudgetForm/messages'

	import './style.css'

	export default {
		props: { budget_id: String },
		i18n: { messages },
		data() {
			return {
				budget: null,
				dateString: '',
			}
		},
		mounted() {
			this.load()
			this.dateString = this.createDateString()
		},
		methods: {
			load() {
				if (this.budget_id) {
					Budgets.getBudget(this.budget_id, (result) => {
						this.budget = Object.assign({}, result.data)
						if (result.data) {
							this.budget.expiration_date = this.createDateString(this.budget.expiration_date)
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
					})
				}
			},
			createDateString(date) {
				const myDate = date ? new Date(date) : new Date()
				const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
				const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
				return days[myDate.getDay()] + ', ' + myDate.getDate() + ' de ' + months[myDate.getMonth()] + ' de ' + myDate.getFullYear()
			},
		},
	}
</script>
