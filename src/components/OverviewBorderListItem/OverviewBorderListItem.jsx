import React from 'react'
import ThemeLine  from '../ThemeLine/ThemeLine'
import "./OverviewBorderListItem.css"

const OverviewBorderListItem = ({theme,name,amount}) => {
  return (
    <div className="relative flex gap-1 flex-1 overview-list-item">
      <div>
        <ThemeLine theme={theme}/>
      </div>
      <div className="flex-column gap-small">
        <h5 className="mid-thin no-whitespace">{name}</h5>
        <h5>${amount}</h5>
      </div>
  </div>
  )
}

export default OverviewBorderListItem