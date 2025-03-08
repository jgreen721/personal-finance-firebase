import React from 'react'
import { IoMdNavigate } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import Avatar from "../Avatar/Avatar"
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import "./PageHeader.css"
import { useAuthContext } from '../../context/AuthContext';

const PageHeader = ({handleFunc}) => {
    const location = useLocation()
    const {signout,user} = useAuthContext();
    const {setShowNav,showNav,setShowModal} = useAppContext()


    const formatText=()=>{
      let pathName = location.pathname.split("/")[1]
      let formattedName = pathName.slice(0,pathName.length-1)

      return formattedName
    }

    // console.log(location.pathname)
  return (
    <div className="page-header">
      <div className="flex flex-start gap-1">

        <Avatar img={user?.avatarUrl}/>
        <h1 className="capitalize"><span className="desktop-tablet">{`${user?.email.split("@")[0]} -`}</span> {location.pathname == "/" ? 'Overview' : location.pathname.split("/")[1]}</h1>
      </div>  
        <div className="btn-row flex-center gap-2">
          <button onClick={()=>setShowNav(true)} className={`transparent-btn page-header-icon-btn ${showNav ? 'lower-element' : 'rise-element'}`}>
                <IoMdNavigate />
          </button>
         
          {location.pathname != "/" && location.pathname != "/recurring" ?
            <button onClick={setShowModal} className="btn btn-dark add-btn capitalize">
                + <span className="desktop-tablet">add new {formatText()}</span>
            </button>
            : null
            } 
            <button onClick={signout} className="transparent-btn page-header-icon-btn signout-btn">
                <FaSignOutAlt/>
            </button>
        </div>
    </div>
  )
}

export default PageHeader