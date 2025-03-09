import React, {useState,useEffect} from 'react'
import { CardHeader } from '../../../../components'
import { useAppContext } from '../../../../context/AppContext'
import ProgressSection from '../ProgressSection/ProgressSection'
import "./PotCard.css"

const PotCard = ({pot,handleActionToPot}) => {
  const [showDropDown,setShowDropDown] = useState(false);
  const {showModal} = useAppContext();
  // console.log(pot)

      useEffect(()=>{
        if(showModal){
          setShowDropDown(false);
        }
      },[showModal])


      console.log("Pot",pot)


  return (
    <div className="pot-card parent-content-card bg-white">
      <CardHeader title={pot.name} item={pot} itemType="pot" handleAction={handleActionToPot}/>
      <ProgressSection pot={pot} caption="Total Saved"/>
        <div className="justify-between gap-1">
            <button onClick={()=>handleActionToPot("add",pot)} className="btn btn-full bg-beige-100">+ Add Money</button>
            <button onClick={()=>handleActionToPot("withdraw",pot)} className="btn btn-full bg-beige-100">Withdraw</button>
        </div>
    </div>
  )
}

export default PotCard