import React from 'react'
import {OverviewBorderListItem, OverviewCardHeader,Chart} from "../../../../components"
import { useAppContext } from '../../../../context/AppContext'
import "./Budgets.css"

const Budgets = () => {
  const {budgets} = useAppContext();

  // console.log("Budgets",budgets);
  return (
    <div className="parent-content-card bg-white">
<OverviewCardHeader title="budgets" btnText="see details" link="/budgets"/>
<div className="collapse-flex-row">
  <div className="flex-2">
    <Chart budgets={budgets}/>
  </div>
  <div className="flex-1">
    <div className="overview-budgets-list">
    {budgets.map(budget=>(
      <OverviewBorderListItem key={budget.id} theme={budget.theme} name={budget.category} amount={budget.max}/>
    ))}
    </div>
  </div>
</div>
    </div>
  )
}

export default Budgets