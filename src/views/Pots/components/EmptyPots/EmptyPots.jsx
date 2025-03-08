import React from 'react'
import { emptyPotImg } from '../../../../const'
import { useAppContext } from '../../../../context/AppContext'
import "./EmptyPots.css"

const EmptyPots = () => {
    const {setShowModal} = useAppContext();
  return (
    <div className="empty-pots-container">
        <div className="empty-pots-img-div">
            <img className="empty-pots-img" src={emptyPotImg} alt="" />
        </div>
        <h2 className="mid-thin">You currently have <span className="bold">no</span> pots your saving towards.</h2>
        <button onClick={()=>setShowModal(true)} className="btn btn-dark">Add Pot</button>
    </div>
  )
}

export default EmptyPots