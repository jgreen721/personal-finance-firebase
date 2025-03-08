import React from 'react'
import { Outlet } from 'react-router-dom'
import {Navbar,MobileNav,PageHeader} from "../../../../components"
import {  useAppContext } from '../../../../context/AppContext'
import "./DashboardContent.css"

const DashboardContent = () => {
    // const {showNav} = useAppContext();
  return (
    <div className="dashboard-content-row">
      <Navbar/>
      <div className={`dashboard-content-column`}>
        <PageHeader/>
            <Outlet/>
       </div>
      <MobileNav/>
    </div>
  )
}

export default DashboardContent