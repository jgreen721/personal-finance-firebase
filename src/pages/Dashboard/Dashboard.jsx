import React from 'react'
import { AppProvider } from '../../context/AppContext'
import {DashboardContent} from "./components"
import "./Dashboard.css"


const Dashboard = () => {
  


  return (
    <AppProvider>
      <DashboardContent/>
    </AppProvider>
  )
}

export default Dashboard