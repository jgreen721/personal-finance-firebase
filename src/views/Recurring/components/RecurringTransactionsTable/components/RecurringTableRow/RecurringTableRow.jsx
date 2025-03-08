import React, { useEffect,useState } from 'react'
import { Avatar } from '../../../../../../components'
import { ordinalSuffixMap } from '../../../../../../const'
import {iconBillDue,iconBillPaid} from "../../../../../../const"
import "./RecurringTableRow.css"

const RecurringTableRow = ({transaction,currMonth,currDay}) => {
  const [isPaid,setIsPaid] = useState(false);
  const [isUpcoming,setIsUpcoming] = useState(false);

const ordinalDayOfTheMonth=(timestamp)=>{
    let date = new Date(timestamp)
    return ordinalSuffixMap[date.getUTCDate()]   //.getUTCDate() return Int: 1 -> 1st
}

const transactionMonthAndDay=(timestamp)=>{
  let tDate = new Date(timestamp);
  return {tMonth:tDate.getUTCMonth() + 1,tDay:tDate.getUTCDate()}
}

useEffect(()=>{
  let {tMonth,tDay} = transactionMonthAndDay(transaction.date)
  if(currMonth > tMonth){
    setIsPaid(true)
   }
  if(tMonth == currMonth && tDay - currDay < 3){
    setIsUpcoming(true)
  }

  return ()=>{
    // console.log("clean up!!")
    setIsUpcoming(false);
    setIsPaid(false);
  }
  
},[transaction])
  return (


      <li className="recurring-transaction-item item-border-bottom">
        <div className="flex-2">
          <div className="flex-start gap-1">
             <Avatar img ={transaction.avatar}/>
            <h4 className="bold">{transaction.name}</h4>
          </div>
        <div className="mobile">
          <div className={`${isPaid ? 'success-text' : ''} text-start no-whitespace semi-bold mt-2 flex gap-1 flex-1`}>
            <p> Monthly - {ordinalDayOfTheMonth(transaction.date)} </p>
            <div style={{opacity:isPaid || isUpcoming ? 1 : 0}}><img src={isPaid ? iconBillPaid : iconBillDue} alt="icon"/></div>
          </div>
        </div>
      </div>
      <div className={`${isPaid ? 'success-text' : ''} relative text-end no-whitespace semi-bold flex flex-end gap-1 flex-1 desktop-tablet`}>
       <p> Monthly - {ordinalDayOfTheMonth(transaction.date)} </p>
       {/* <p> Monthly - {`${new Date(transaction.date).getUTCMonth() + 1}/${new Date(transaction.date).getUTCDate()}`} </p> */}
       <div style={{opacity:isPaid || isUpcoming ? 1 : 0}}><img src={isPaid ? iconBillPaid : iconBillDue} alt="icon"/></div>
       {isUpcoming && <small className="due-soon-caption">Due soon</small>}
      </div>
      <div className={`${isUpcoming ? "error-text" : ""} bold text-end flex-1`}>
        <h4>${Math.abs(transaction.amount).toFixed(2)}</h4>
      </div>
  </li>
  )
}

export default RecurringTableRow