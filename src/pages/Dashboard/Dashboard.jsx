import React from 'react'
import { AppProvider } from '../../context/AppContext'
import { useAuthContext } from '../../context/AuthContext'
import {DashboardContent} from "./components"
import "./Dashboard.css"


const Dashboard = () => {
  // const {signout,user} = useAuthContext()
  // console.log(user)


  return (
    <AppProvider>
      {/* <div className="dashboard-parent-container"> */}
        {/* <div className="dashboard-content-row">
          <Navbar/>
          <div className="dashboard-content-column">
            <PageHeader/>
            <div className="outlet-container">
              <Outlet/>
            </div>
          <MobileNav/>
        </div>
      </div> */}
      <DashboardContent/>
    {/* </div> */}
    </AppProvider>
  )
}

export default Dashboard