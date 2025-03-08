import React, {useState, useEffect} from 'react'
import { ModalOverlay,Empty,DeleteModal } from '../../components'
import { emptyPotImg } from '../../const'
import { useAppContext } from '../../context/AppContext'
import { PotCard, PotsModal,ActionPotModal } from './components'
import "./Pots.css"

const Pots = () => {
  const {pots,setShowModal,showModal} = useAppContext()
  // const [actionToPot,setActionToPot] = useState(false);
  const [showAdd,setShowAdd] = useState(false);
  const [showWithDraw,setShowWithDraw] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [activePot,setActivePot] = useState(null);

  const handleActionToPot=(action,pot)=>{
    console.log("action",action);
    if(action == "add")setShowAdd(true);
    if(action == "withdraw")setShowWithDraw(true);
    if(action == "edit")setShowEdit(true);
    if(action == "delete")setShowDelete(true);
    setShowModal(true)
    setActivePot(pot);
  }


  useEffect(()=>{
    if(showModal == false){
      setTimeout(()=>{
      setShowAdd(false);
      setShowWithDraw(false);
      setShowEdit(false);
      setShowDelete(false);
      console.log('clear active pot ---')
      setActivePot(null);
      },1000);
    }

  },[showModal])
  return (
    <div>
      <ModalOverlay>
        {showAdd ? 
        <ActionPotModal pot={activePot} title="Add to Pot" label="Add" btnText="Addition"/> : 
        showWithDraw ? 
        <ActionPotModal pot={activePot} title="Withdraw from Pot" label="Withdraw" btnText="Withdrawal"/>: 
        showEdit ? 
        <PotsModal modalTitle="Edit pot" btnText="Edit" activePot={activePot}/> :
        showDelete ?
        <DeleteModal deleteItem={activePot} itemType="pot" title={activePot.name}/>
        :
        <PotsModal modalTitle="Add new pot" btnText="Add"/>
       
        }
        
        
      </ModalOverlay>
      <div className="pots-main-content">
        {pots.length 
        ? 
        <div className="pots-grid">
        {pots.map(pot=>(
          <PotCard handleActionToPot={handleActionToPot} key={pot.id} pot={pot}/>
        ))}
        </div>
        :
      <Empty img={emptyPotImg} category="pots"/>
        }
      </div>
    </div>
  )
}

export default Pots