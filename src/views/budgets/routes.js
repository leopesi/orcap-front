import Vue from 'vue'
import Router from 'vue-router'

import BudgetList from './budgets/BudgetList/BudgetList'
import BudgetForm from './budgets/BudgetForm/BudgetForm'

Vue.use(Router)

export default [
	{ path: '/budgets', component: BudgetList },
	{ path: '/budgets/:id', component: BudgetForm, props: true },
	{ path: '/new-budgets', component: BudgetForm },
]
