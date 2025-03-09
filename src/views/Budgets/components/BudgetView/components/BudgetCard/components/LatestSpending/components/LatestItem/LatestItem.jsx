import React from 'react'
import { monthAbbreviationMap } from '../../../../../../../../../../const'
import { Avatar } from '../../../../../../../../../../components'
import { formatDate } from '../../../../../../../../../../utils/helpers'

import "./LatestItem.css"

const LatestItem = ({item}) => {

  const dateTimeFormat = (date)=>{
    // console.log("Date",new Date(date))
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, 
  }).format(new Date(date));

  return formattedDate;
}
  return (
    <li className="latest-spending-item flex justify-between item-border-bottom">
    <div className="flex-start gap-1">
        <Avatar img={item.avatar} alt="img"/>
        <h4>{item.name}</h4>
    </div>
    <div className="flex-column flex-end">
        <h4 className="pb-1">-${Math.abs(item.amount).toFixed(2)}</h4>
        <h5 className="mid-thin">{dateTimeFormat(item.date)}</h5>
    </div>
</li>
  )
}

export default LatestItem