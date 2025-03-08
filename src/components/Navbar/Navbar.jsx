import React from 'react'
import { iconlogoLarge,iconNavOverview,iconNavOverviewActive, iconNavTransactions, iconNavTransactionsActive, iconNavBudgets, iconNavBudgetsActive ,iconNavPots, iconNavPotsActive, iconNavRecurringBills, iconNavRecurringBillsActive, iconMinimizeMenu } from '../../const'
import {useNavigate} from "react-router-dom"
import "./Navbar.css"
import { useAppContext } from '../../context/AppContext'

const Navbar = () => {
    const {showNav,setShowNav,setShowModal} = useAppContext()
    const navigate = useNavigate();
    const links =[
        {id:1,name:"Overview",link:"/",icon:iconNavOverview,active:iconNavOverviewActive},
        {id:2,name:"Transactions",link:"/transactions",icon:iconNavTransactions,active:iconNavTransactionsActive},
        {id:3,name:"Budgets",link:"/budgets",icon:iconNavBudgets,active:iconNavBudgetsActive},
        {id:4,name:"Pots",link:"/pots",icon:iconNavPots,active:iconNavPotsActive},
        {id:5,name:"Recurring Bills",link:"/recurring",icon:iconNavRecurringBills,active:iconNavRecurringBillsActive},
    ]
  return (
    <nav className={`nav ${!showNav && 'hide-nav'}`}>
        <div className="nav-content">
            <div className="nav-column">
                <div className="nav-logo-header">
                    <img className="nav-logo-img" src={iconlogoLarge} alt="" />
                </div>
                <ul className="nav-links">
                    {links.map(link=>(
                        <li key={link.id} className={`${location.pathname == link.link && 'active-nav-link-item'} nav-link-item`}>
                            {/* <Link to={link.link} className={`${location.pathname == link.link ? 'dark-text' : 'grey-300-text'} nav-link`}>
                                <div className="nav-item-icon-div">
                                    <img src={location.pathname == link.link ? link.active : link.icon} alt="" />
                                </div>
                                    <h3 className="nav-item-text">{link.name}</h3>
                            </Link> */}
                            <button onClick={()=>{
                                setShowModal(false);
                                navigate(link.link)
                            }} className={`${location.pathname == link.link ? 'dark-text' : 'grey-300-text'} nav-btn-link transparent-btn`}>
                                <div className="nav-item-icon-div">
                                    <img src={location.pathname == link.link ? link.active : link.icon} alt="" />
                                </div>
                                    <h3 className="nav-item-text">{link.name}</h3>
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={()=>setShowNav(false)} className="grey-300-text flex-start gap-1 nav-menu-btn">
                <img className="menu-btn-icon" src={iconMinimizeMenu} alt="" />
                  <h3>Minimize Menu</h3>
                  <div className="btn-shadow-text">
                  <img className="menu-btn-icon shadow" src={iconMinimizeMenu} alt="" />
                  <h3>Minimize Menu</h3>
                  </div>
            </button>
        </div>
    </nav>
  )
}

export default Navbar