import Vue from 'vue'
import Router from 'vue-router'

import BudgetList from './budgets/BudgetList/BudgetList'
import BudgetForm from './budgets/BudgetForm/BudgetForm'
import BudgetPDF from './budgets/BudgetPDF/BudgetPDF'

Vue.use(Router)

export default [
	{ path: '/budgets', component: BudgetList },
	{ path: '/budget/:id', component: BudgetForm, props: true },
	{ path: '/budget', component: BudgetForm },
	{ path: '/budget-pdf/:budget_id', component: BudgetPDF, props: true },
]
