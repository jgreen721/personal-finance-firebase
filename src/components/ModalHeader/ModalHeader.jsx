import React from 'react'
import { useAppContext } from '../../context/AppContext'
import "./ModalHeader.css"

const ModalHeader = ({title}) => {
    const {setShowModal} = useAppContext();
  return (
    <div className="modal-header-row justify-between">
        <h1 className="capitalize">{title}</h1>
        <button onClick={()=>setShowModal(showModal=>showModal=!showModal)} className="close-modal-btn">X</button>
    </div>
  )
}

export default ModalHeader