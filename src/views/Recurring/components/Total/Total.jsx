import React from 'react'
import { iconRecurringBills } from '../../../../const'
import "./Total.css"

const Total = ({total}) => { 

  return (
    <div className="recurring-content-card bg-dark text-white flex-column gap-2">
      <div className="icon-div">
        <img src={iconRecurringBills} alt="" />
      </div>
      <div className="total-text-div">
        <h5 className="mid-thin pb-1">Total Bills:</h5>
        <h1>${total}</h1>
      </div>
    </div>
  )
}

export default Total