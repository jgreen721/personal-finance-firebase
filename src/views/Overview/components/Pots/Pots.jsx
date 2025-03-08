import React from 'react'
import { iconPot } from '../../../../const'
import {  OverviewBorderListItem, OverviewCardHeader} from '../../../../components'
import { useAppContext } from '../../../../context/AppContext'
import "./Pots.css"

const Pots = () => {
  const {pots} = useAppContext();
  // console.log(pots)
  // let pots = [];
  return (
  pots.length ? 
    <div className="bg-white parent-content-card">
     <OverviewCardHeader title="pots" btnText="see details" link="/pots"/>
      <div className="flex pot-card-row gap-2">
        <div className="flex-1 flex-start gap-2 pot-card-column bg-beige-100">
          <div className="pot-icon-div p-1">
            <img src={iconPot} alt="pot" />
          </div>
          <div>
            <h4>Total Saved:</h4>
            <h1>${pots.reduce((a,b)=>a+b.total,0)}</h1>
          </div>
          </div>
          <div className="flex-1">
            <div className="pot-grid">
              {pots.slice(0,4).map((pot,idx)=>(
          <OverviewBorderListItem key={pot.id} name={pot.name} amount={pot.target} theme={pot.theme}/>
          ))}
          </div>
        </div>
      </div>

    </div>
    :
    <div className="parent-content-card flex-center bg-white">
    <h1>No <span className="mid-thin">Pots</span></h1>
    </div>
              
  )
}

export default Pots