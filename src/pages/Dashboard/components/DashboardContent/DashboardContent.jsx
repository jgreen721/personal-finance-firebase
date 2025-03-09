import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar,MobileNav,PageHeader} from "../../../../components"
import {  useAppContext } from '../../../../context/AppContext'
import "./DashboardContent.css"

const DashboardContent = () => {
    const {showModal} = useAppContext();
  return (
    <div className="dashboard-content-row">
      <Navbar/>
      <div className={`dashboard-content-column ${showModal ? '' : 'overflow'}`}>
        <PageHeader/>
            <Outlet/>
       </div>
      <MobileNav/>
    </div>
  )
}

export default DashboardContent