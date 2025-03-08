import React from 'react'
import { PiPiggyBank } from "react-icons/pi";
import CountUp from 'react-countup'
import "./SummaryCard.css"

const SummaryCard = ({amount,category,isDark})=>{

  
return (
  <div className={`summary-card card-padding-radius ${isDark ? 'bg-dark text-white' : 'bg-white'}`}>
      {amount != null && amount != 0
      ?
        <div className="summary-card-content">
            <h3 className="mid-thin">{category}</h3>
            <h1>{amount < 0 && "-"}$<CountUp end={Math.abs(amount)} decimals={2} start={0} separator=","/></h1>
        </div>
      :
        <div className="empty-summary-card">
          <PiPiggyBank />
          <h2 className="mid-thin">No {category}'s :(</h2>
        </div>
      }
</div>
)
}

export default SummaryCard