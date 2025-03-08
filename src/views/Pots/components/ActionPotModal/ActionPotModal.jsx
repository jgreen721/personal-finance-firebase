import React, {useState} from 'react'
import { FormErrorCaption,InputCaption,ModalHeader} from "../../../../components"
import ProgressSection from '../ProgressSection/ProgressSection'
import {useAppContext} from "../../../../context/AppContext"

const ActionPotModal = ({title,label,pot,btnText}) => {
  const [amountError,setAmountError] = useState(false);
  const [showCaption,setShowCaption] = useState(false);
  const [captionMsg,setCaptionMsg] = useState("");
  const [amount,setAmount] = useState("")
  const {editpot_total} = useAppContext()
  // console.log("Pot",pot)

  const handlePotAction=(e)=>{
    e.preventDefault();
    // console.log("handlePotAction fired!",label)
    if(label == "Add"){
      // console.log("add amount to firebase!",amount);
      let tempAmount = parseFloat(amount);
      let maxAmount = parseFloat(pot.target) - parseFloat(pot.achieved);
      // console.log("MaxAmount",maxAmount);
      tempAmount = tempAmount < maxAmount ? tempAmount : maxAmount;
      // console.log("Amount",tempAmount);
      editpot_total(pot,tempAmount);
    }else{
      console.log("subtract from achieved",amount);
      let tempAmount = parseFloat(amount);
      let maxAmount = tempAmount < parseFloat(pot.achieved) ? tempAmount : parseFloat(pot.achieved)
      maxAmount *= -1;
      editpot_total(pot,maxAmount);

    }
 
  }


  const handleChangeAmount=(e)=>{
  
    setAmount(e.target.value);
    if(isNaN(e.target.value)){
      // console.log("not a number!")
      setAmountError(true);
      return;
  }
  if(amountError)setAmountError(false);
  let floatAmount = parseFloat(e.target.value)
  let floatAchieved = parseFloat(pot.achieved)
  if(label == "Withdraw"){
    validateWithDraw(floatAchieved,floatAmount)
  }else{
    validateAdd(floatAchieved,floatAmount)

  }
  
}

const validateWithDraw=(floatAchieved,newAmt)=>{
  if(floatAchieved - newAmt < 0){
    console.log("Goal achieved!");
    setShowCaption(true);
    setCaptionMsg("Exceeded available amount.")
  }else{
    setShowCaption(false);
    setCaptionMsg("")

  }
}

const validateAdd=(floatAchieved,newAmt)=>{
if(newAmt + floatAchieved > pot.target){
  console.log("Goal achieved!");
  setShowCaption(true);
  setCaptionMsg("Goal achieved!")

}else{
  setShowCaption(false);
  setCaptionMsg("");
}
}
  return (
    <div className="modal">
        <ModalHeader title={title}/>
        <p className="my-2">Add towards your goal of saving for a <span className="bold">{pot.name}</span>. </p>
        <ProgressSection pot={pot} 
                        caption="New amount" 
                        newAmt={label == "Add" ? parseFloat(amount) : -amount}
                        />  
      <form>
        <div className="form-div">
          <label htmlFor="amount">Amount to {label}:</label>
          <input type="text" name="amount" autoComplete="off" onChange={(e)=>handleChangeAmount(e)} placeholder="0.00" className="form-control"/>
          <div className="input-dollar-icon">
            <h4 className="mid-thin grey-500-text">$</h4>
          </div>
          <FormErrorCaption showError={amountError} msg="Invalid amount"/>
          {!amountError && <InputCaption msg={captionMsg} showCaption={showCaption} textColor={label == "Withdraw"  ? "error-text" : "success-text"}/>}
        </div>
        <button onClick={handlePotAction} className="btn btn-dark btn-full mt-2">Confirm {btnText}</button>
      </form>
    </div>
  )
}

export default ActionPotModal