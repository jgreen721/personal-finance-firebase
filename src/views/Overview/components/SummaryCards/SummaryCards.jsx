import React from 'react'
import { useAuthContext } from '../../../../context/AuthContext';
import { useAppContext } from '../../../../context/AppContext';
import {SummaryCard} from "./components"
import "./SummaryCards.css"




const SummaryCards = () => {
  const {user} = useAuthContext()
  const {transactions} = useAppContext()



  return (
    <div className="summary-cards-row">
          <SummaryCard category="Current Balance" amount={user?.balance} isDark={true}/>
          <SummaryCard category="Income" amount={transactions.filter(t=>t.amount > 0).reduce((a,b)=>a + parseFloat(b.amount),0)} isDark={false}/>
          <SummaryCard category="Expenses" amount={transactions.filter(t=>t.amount < 0).reduce((a,b)=>a + parseFloat(b.amount),0)} isDark={false}/>
    </div>
  )
}

export default SummaryCards