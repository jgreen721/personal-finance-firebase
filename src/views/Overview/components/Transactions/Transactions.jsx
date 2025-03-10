import React from 'react'
import { Avatar, OverviewCardHeader } from '../../../../components'
import { formatDate,parseAndReturnDate,formatAmount } from '../../../../utils/helpers'
import { useAppContext } from '../../../../context/AppContext'

const Transactions = () => {
  const {transactions} = useAppContext()

  // console.log(transactions);
  return (
    <div className="parent-content-card bg-white">
     <OverviewCardHeader title="transactions" btnText="view all" link="/transactions"/>
      <ul className="overview-transactions-list">
       {transactions.slice(0,5).map((t,idx)=>(
         <li key={idx} className="justify-between py-1 item-border-bottom">
           <div className="flex-start gap-1">
              <Avatar img={t.avatar}/>
              <h5>{t.name}</h5>
           </div>
           <div>
              <h4 className="pb-1">{formatAmount(t.amount)}</h4>
              <h5 className="mid-thin">{parseAndReturnDate(formatDate(t.date))}</h5>
           </div>
        </li>
       ))}
     </ul>
      </div>
  )
}

export default Transactions