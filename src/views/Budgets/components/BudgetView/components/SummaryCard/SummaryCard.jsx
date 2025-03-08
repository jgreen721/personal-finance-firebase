import React from 'react'
import {SpendingSummary} from "./components"
import { Chart } from '../../../../../../components'
import "./SummaryCard.css"

const SummaryCard = ({budgets}) => {
  return (
    <div className="parent-content-card summary-card bg-white">
      <Chart budgets={budgets}/>
      <SpendingSummary budgets={budgets}/>
    </div>
  )
}

export default SummaryCard