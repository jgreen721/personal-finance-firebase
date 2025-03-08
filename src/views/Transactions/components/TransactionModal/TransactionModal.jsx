import React, {useState,useRef} from 'react'
import { DropDown, FileUpload,ModalHeader,FormDiv } from '../../../../components'
import { categories } from '../../../../const'
import { useAppContext } from '../../../../context/AppContext'
import "./TransactionModal.css"

const TransactionModal = () => {
      const [selectedFile,setSelectedFile] = useState(null);
      const [recurring,setRecurring] = useState(false);
      const [amountError,setAmountError] = useState(false);
      const [nameError,setNameError] = useState(false)

      const [category,setCategory] = useState(null)
      const [isPayment,setIsPayment] = useState(false);
      const {add_transaction,alertStatus} = useAppContext();
      const formRef = useRef();
    // console.log("ShowModal",showModal)
  

    const handleAddTransaction=(e)=>{
      // console.log("handlAddTransaction fired!")
      e.preventDefault();
      let formData = new FormData(formRef.current);
      let transactionData={
        name:formData.get("name"),
        amount:formData.get("amount"),
        category,
        recurring,
        avatarFile:selectedFile?.file
      }
      let isValid = true;
      if(transactionData.name == "" || !isNaN(transactionData.name)){
        isValid = false;
        setNameError(true)
      }

      if(transactionData.amount == "" || isNaN(transactionData.amount)){
        isValid = false;
        setAmountError(true)
      }

      if(!isValid){
        setTimeout(()=>{
          setNameError(false);
          setAmountError(false);
        },2000)
      }else{
        if(isPayment){
        transactionData.amount *= -1;
      }
      add_transaction(transactionData)
      formRef.current['name'].value = "";
      formRef.current['amount'].value = "";


      console.log("Newly Added TransactionObject",transactionData);
    }
    }
    
  return (
    <div className="bg-white modal">
      <ModalHeader title="Add a new Transaction"/>
      <h3 className={`capitalize ${alertStatus.status == null ? 'scale-0' : 'scale-1'} ${alertStatus.status != 200 ? 'error-text' : 'success-text'} mt-2`}>{alertStatus.msg}</h3>
      <form ref={formRef} className="form">
        <div className="pb-2 high-z">
          <DropDown items={categories} setSelectedItem={setCategory} label="category"/>
        </div>
        <div className="form-row">
          <FormDiv label="name" fieldName="name" placeholder="Name" showError={nameError} errorMsg="Invalid transaction name"/>
          <FormDiv label="amount" fieldName="amount" placeholder="eg 200" showError={amountError} errorMsg="Invalid transaction amount"/>
        </div>
        <div className="form-row">
          <FileUpload setSelectedFile={setSelectedFile}/>
          <div className="form-div flex-end gap-1">
            <label htmlFor="payment">Payment:</label>
            <div onClick={()=>setIsPayment(isPayment=>isPayment = !isPayment)} className={`checkbox`}>
              <div className={`circle-check-blob ${isPayment ? 'scale-1' : 'scale-0'}`}></div>
            </div>
          </div>
          <div className="form-div flex-end gap-1">
            <label htmlFor="recurring">Recurring:</label>
            <div onClick={()=>setRecurring(recurring=>recurring = !recurring)} className={`checkbox`}>
              <div className={`circle-check-blob ${recurring ? 'scale-1' : 'scale-0'}`}></div>
            </div>
          </div>
       </div> 
       <div className="form-div pt-2">
         <button onClick={handleAddTransaction} className="btn btn-full btn-dark">Add Transaction</button>
       </div>
     </form>
    </div>
  )
}

export default TransactionModal