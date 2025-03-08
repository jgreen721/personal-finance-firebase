import React from 'react'
import {LinkBtn} from "./components"
import "./OverviewCardHeader.css"

const OverviewCardHeader = ({title,btnText,link}) => {
  return (
    <div className="justify-between flex pb-2">
        <h2 className="capitalize">{title}</h2>
        <LinkBtn text={btnText} link={link}/>
  </div>
  )
}

export default OverviewCardHeader