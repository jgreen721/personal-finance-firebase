import React from 'react'
import  ModalHeader  from '../ModalHeader/ModalHeader'
import { useAppContext } from '../../context/AppContext'
import "./DeleteModal.css"

const DeleteModal = ({deleteItem,itemType,title}) => {
    const {setShowModal,delete_item} = useAppContext();
  return (
    <div className="modal flex-column">
        <ModalHeader title={`Delete '${title}'`}/>
        <h4 className="mid-thin line-height-2">Are you sure you want to delete this {itemType}? This action cannot be reversed and all the data inside it will be removed forever.</h4>
        <div>
            <button onClick={()=>delete_item(itemType,deleteItem)} className="btn btn-full btn-delete">Yes, Confirm Delete</button>
            <button onClick={()=>setShowModal(false)} className="btn btn-full mt-1">No, Go Back</button>
        </div>
    </div>
  )
}

export default DeleteModal