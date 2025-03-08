import React, {useEffect,useState} from 'react'
import { ModalOverlay,Empty,DeleteModal } from '../../components'
import { BudgetsModal, BudgetView } from './components'
import { emptyBudgetsImg } from '../../const'
import { useAppContext } from '../../context/AppContext'
import "./Budgets.css"



const Budgets = () => {
  const {budgets,setShowModal,showModal} = useAppContext();
  const [showEdit,setShowEdit] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [activeBudget,setActiveBudget] = useState(null);
  // console.log("Budgets",budgets);


  const handleActionToBudget=(action,budget)=>{
    // console.log("budgetView -- action",action);
    if(action == "edit"){
      setShowEdit(true);
      }
    if(action == "delete"){
      setShowDelete(true);
      }

    setShowModal(true)
    setActiveBudget(budget)
  }


  useEffect(()=>{
    if(showModal == false){
      setTimeout(()=>{
      setShowDelete(false);
      setActiveBudget(null);
            // console.log('clear active pot ---')

      },1000);
    }

  },[showModal])

  return (
    <div>
      <ModalOverlay>
        {showEdit ? 
        <BudgetsModal budgets={budgets} btnText="Save Changes" caption="Choose a category to set a spending budget. These categories can help you monitor spending." title="Edit Budget" activeBudget={activeBudget}/>
        :
        showDelete ? 
        <DeleteModal deleteItem={activeBudget} itemType="budget" title={activeBudget?.category}/>
        :
        <BudgetsModal budgets={budgets} btnText="Add Budget" caption="As your budget change, feel free to update your spending limits." title="Add New Budget"/>
        }
      </ModalOverlay>
      <div className="budgets-main-content view-main-content">
          {budgets.length  
            ?
            <BudgetView handleActionToBudget={handleActionToBudget} budgets={budgets}/>
            :
            <Empty img={emptyBudgetsImg} category="budgets"/>
           }
      </div>
    </div>
  )
}

export default Budgets