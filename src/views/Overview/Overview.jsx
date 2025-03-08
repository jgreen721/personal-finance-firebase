import React from 'react'
import {SummaryCards, Pots,Transactions,Budgets,Recurring} from "./components"
import "./Overview.css"

const Overview = () => {
  return (
    <div>
      <SummaryCards/>
      <div className="overview-content">
        <div className="overview-column">
          <Pots/>
          <Transactions/>
        </div>
        <div className="overview-column">
          <Budgets/>
          <Recurring/>
        </div>
      </div>
    </div>
  )
}

export default Overview