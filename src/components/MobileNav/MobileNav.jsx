import React from 'react'
import { iconlogoLarge,iconNavOverview,iconNavOverviewActive, iconNavTransactions, iconNavTransactionsActive, iconNavBudgets, iconNavBudgetsActive ,iconNavPots, iconNavPotsActive, iconNavRecurringBills, iconNavRecurringBillsActive, iconMinimizeMenu } from '../../const'
import {Link, useNavigate} from "react-router-dom"
import "./MobileNav.css"
import { useAppContext } from '../../context/AppContext'

const MobileNav = () => {
  const links =[
    {id:1,name:"Overview",link:"/",icon:iconNavOverview,active:iconNavOverviewActive},
    {id:2,name:"Transactions",link:"/transactions",icon:iconNavTransactions,active:iconNavTransactionsActive},
    {id:3,name:"Budgets",link:"/budgets",icon:iconNavBudgets,active:iconNavBudgetsActive},
    {id:4,name:"Pots",link:"/pots",icon:iconNavPots,active:iconNavPotsActive},
    {id:5,name:"Recurring Bills",link:"/recurring",icon:iconNavRecurringBills,active:iconNavRecurringBillsActive},
]
const navigate = useNavigate();
const {setShowModal} = useAppContext();
  return (
    <div className="mobile-nav bg-dark">
    <ul className="mobile-nav-links">
 {links.map(link=>(
   <li key={link.id} className={`mobile-link-item ${location.pathname == link.link ? 'active-mobile-link' : ''}`}>
     <button onClick={()=>{
        setShowModal(false);
        navigate(link.link)
      }} className="mobile-btn-link">
         <div className="mobile-link-icon-div">
           <img src={location.pathname == link.link ? link.active : link.icon} alt="" />
         </div>
         <h5 className={`${location.pathname == link.link ? 'dark-text' : 'grey-300-text'} mobile-nav-link-h5`}>{link.name}</h5>
     </button>
   </li>
 ))}
 </ul>
    </div>
  )
}

export default MobileNav