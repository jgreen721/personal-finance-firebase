import React from 'react'
import  {BudgetCard,SummaryCard}  from './components'
import "./BudgetView.css"
import { useAppContext } from '../../../../context/AppContext'

const BudgetView = ({budgets,handleActionToBudget}) => {
    const {transactions} = useAppContext();


  return (
    <div className="budget-view-container">
      <div className="budget-view-summary-column">
        <SummaryCard budgets={budgets}/>
      </div>
      <div className="budget-view-budgets-column">
        <div className="budget-cards flex-column flex-end gap-1">
            {budgets.map(budget=>(
            <BudgetCard handleActionToBudget={handleActionToBudget} key={budget.id} budget={budget} transactions={transactions.filter(t=>t.category == budget.category)} />
            ))}
        </div>
      </div>
    </div>
  ) 
}

export default BudgetView