import React, {useState,useEffect} from 'react'
import {OverviewCardHeader} from "../../../../components"
import {useAppContext} from "../../../../context/AppContext"
import { getUpcomingBills } from '../../../../utils/helpers'
import CountUp from "react-countup"
import "./Recurring.css"

const Recurring = () => {
  const {isDemo,recurring} = useAppContext();
  const [recurringDueSoon,setRecurringDueSoon] = useState([])

  useEffect(()=>{

    let currDay = new Date().getUTCDate();
    let currMonth = new Date().getUTCMonth() + 1;
    
    if(isDemo){
        currDay = 2;
        currMonth = 8
    }
    let {tempPaidTransactions,tempDueSoonTransactions,tempUpcomingTransactions} = getUpcomingBills(recurring,currDay,currMonth);

    console.log(tempPaidTransactions,tempDueSoonTransactions,tempUpcomingTransactions);
    setRecurringDueSoon([
      {id:1,name:"paid bills",total:tempPaidTransactions.reduce((a,b)=>a+parseFloat(b.amount),0),theme:"--green"},
      {id:2,name:"total upcoming",total:tempUpcomingTransactions.reduce((a,b)=>a+parseFloat(b.amount),0),theme:"--gold"},
      {id:3,name:"due soon",total:tempDueSoonTransactions.reduce((a,b)=>a+parseFloat(b.amount),0),theme:"--cyan"},
    ])
  },[recurring])


  return (
    recurring.length ? 
    <div className="parent-content-card bg-white">
      <OverviewCardHeader title="recurring bills" btnText="see details" link="/recurring"/>
      {recurringDueSoon.map((r,idx)=>(
        <li key={idx} style={{"--borderColor":`var(${r.theme})`,"--delay":`${idx/2}s`}} className="recurring-overview-item flex justify-between bg-beige-100 mb-1 rounded-sm">
          <div className="flex start gap-1">
            <h5 className="capitalize mid-thin">{r.name}</h5>
          </div>
          <h4>$<CountUp start={0} end={Math.abs(r.total)} decimals={2}/></h4>
        </li>
      ))}
    </div>
    :
    <div className="parent-content-card bg-white flex-center">
    <h1>No <span className="mid-thin">Recurring</span></h1>

    </div>
  )
}

export default Recurring