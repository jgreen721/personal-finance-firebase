import React from 'react'
import { Avatar } from '../../../../components'
import {formatDate,formatAmount} from "../../../../utils/helpers"

import "./MobileList.css"

const MobileList = ({data}) => {
    // console.log(data)
  return (
    <ul className="transactions-items-list">
{data.map((item,idx)=>(
    <li key={item?.id ? item.id : idx} className="transaction-item justify-between">
        <div className="transaction-col flex flex-center gap-1">
            <Avatar img={item.avatar}/>
            <div>
                <h5 className="pb-1">{item.name}</h5>
                <h5 className="mid-thin">{item.category}</h5>
            </div>
        </div>
        <div>
            <h5 className="pb-1">{formatDate(item.date)}</h5>
            <h5>{formatAmount(item.amount)}</h5>
        </div>
    </li>
))}
    </ul>
  )
}

export default MobileList