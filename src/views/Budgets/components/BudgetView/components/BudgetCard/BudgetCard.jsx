import React from 'react'
import { CardHeader } from '../../../../../../components'
import {ProgressSection,LatestSpending} from './components'
import "./BudgetCard.css"

const BudgetCard = ({budget,handleActionToBudget,transactions}) => {
  // console.log(budget)
  // console.log("transactionsLength:",transactions.length);
  return (
    <div className="parent-content-card budget-card bg-white">
      <CardHeader title={budget.category} item={budget} itemType="budget" handleAction={handleActionToBudget}/>
      <ProgressSection budget={budget} transactions={transactions}/>
      <LatestSpending transactions={transactions}/>
    </div>
  )
}

export default BudgetCard