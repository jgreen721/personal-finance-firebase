import React from 'react'
import { ModalHeader } from '../../../../components'
import { useAppContext } from '../../../../context/AppContext'
import "./DeleteModal.css"

const DeleteModal = ({activePot}) => {
    const {setShowModal,delete_pot} = useAppContext();
  return (
    <div className="modal flex-column">
        <ModalHeader title={`Delete '${activePot.name}'`}/>
        <h4 className="mid-thin line-height-2">Are you sure you want to delete this pot? This action cannot be reversed and all the data inside it will be removed forever.</h4>
        <div>
            <button onClick={()=>delete_pot(activePot)} className="btn btn-full btn-delete">Yes, Confirm Delete</button>
            <button onClick={()=>setShowModal(false)} className="btn btn-full mt-1">No, Go Back</button>
        </div>
    </div>
  )
}

export default DeleteModal