import React from 'react'
import { SummaryItem } from './components'
import { useAppContext } from '../../../../../../../../context/AppContext'
import "./SpendingSummary.css"

const SpendingSummary = ({budgets}) => {
    const {transactions} = useAppContext();

  return (
    <div>
        <h3>Spending Summary</h3>
        <ul className="summary-items">
            {budgets.map(item=>(
                <SummaryItem key={item.id} item={item} transactions={transactions.filter(t=>t.category == item.category)}/>
            ))}
        </ul>
    </div>
  )
}

export default SpendingSummary