import React from 'react'
import { useAppContext } from '../../context/AppContext'
import "./ModalOverlay.css"

const ModalOverlay = ({children}) => {
  const {setShowModal,showModal} = useAppContext();
  return (
    <div className={`modal-overlay ${showModal ? 'show-modal-overlay' : 'hide-modal-overlay'}`}>
              {React.Children.map(children, (child) =>
              React.cloneElement(child, { setShowModal,showModal })
            
              )}

    </div>
  )
}

export default ModalOverlay