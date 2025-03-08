import React, {useState, useRef, useEffect} from 'react'
import {ModalHeader,DropDown,FormDiv} from "../../../../components"
import { useAppContext } from '../../../../context/AppContext'
import {categories,themes} from "../../../../const"
import "./BudgetsModal.css"

const BudgetsModal = ({budgets,btnText,caption,title,activeBudget=null}) => {
  const {alertStatus,add_budget,edit_item} = useAppContext();
  const [category,setCategory] = useState("");
  const [categoryError,setCategoryError] = useState(false);
  const [theme,setTheme] = useState("")
  const [themeError,setThemeError] = useState(false);
  const [maxError,setMaxError] = useState(false);
  const formRef = useRef();



  const handleBudgetAction =(e)=>{
    e.preventDefault();
    if(activeBudget){
      handleEdit();
    }else{
      handleAddBudget()
    }
  }

  const handleEdit = ()=>{

    console.log("handle edit fired!!")
    let formData = new FormData(formRef.current);
    let budgetObj={
      category,
      max:formData.get("max"),
      theme
    }

    let updatedFields ={};
    let isError = false;
    if(budgetObj.category == ""){
      isError = true;
      setCategoryError(true);
    }
    if(budgetObj.category != activeBudget.category){
      updatedFields.category = budgetObj.category;
    }
    if(budgetObj.max == ""){
      isError = true;
      setMaxError(true);
    }
    if(budgetObj.max != activeBudget.max){
      updatedFields.max = budgetObj.max;
    }
    if(budgetObj.theme == ""){
      isError = true;
      setThemeError(true);
    }
    if(budgetObj.theme != activeBudget.theme){
      updatedFields.theme = `bg-${budgetObj.theme}`
    }


    if(isError){
      setTimeout(()=>{
        setMaxError(false)
        setCategoryError(false);
        setThemeError(false);
      },2000);
    }else{
        setCategory("");
        setTheme("");
        formData.set("max","");
        let collectionName = "budgets"
        if(Object.keys(updatedFields).length)edit_item(activeBudget,updatedFields, collectionName);

    }
      console.log(budgetObj);

  }
  const handleAddBudget = ()=>{
    console.log("handleAddBudget() fired--")

    let formData = new FormData(formRef.current);
    let budgetObj={
      category,
      max:formData.get("max"),
      theme
    }
    let isError = false;
    if( budgetObj.max == ''){
      setCategoryError(true)
      isError = true;
    }
    if(isNaN(budgetObj.max) || budgetObj.max == ''){
      setMaxError(true);
      isError = true;
    }

    if( budgetObj.theme == ''){
      setThemeError(true);
      isError = true;
    }

    if(isError){
    setTimeout(()=>{
      setMaxError(false)
      setCategoryError(false);
      setThemeError(false);
    },2000);
  }else{
      add_budget(budgetObj);
      setCategory("");
      setTheme("");
      formData.set("max","");
  }
    console.log(budgetObj);
  }

  useEffect(()=>{
    if(activeBudget){
      setCategory(activeBudget.category);
      formRef.current.querySelector("#max").value = activeBudget.max;
      console.log("BUDGGET",activeBudget);
    }
    else{
      formRef.current.querySelector("#max").value = ""

    }
  },[activeBudget])


  return (
    <div className="bg-white modal">
      <ModalHeader title={title}/>
  {/* <h3 className={`${alertStatus.status == null ? 'scale-0' : 'scale-1'} ${alertStatus.status != 200 ? 'error-text' : 'success-text'} mt-2`}>{alertStatus.msg}</h3> */}
      <h4 className="my-2 mid-thin">{caption}</h4>
      <form className="form" ref={formRef}>
       
          <DropDown items={categories} 
                    setSelectedItem={setCategory} 
                    label="budget category" 
                    zIndex={10} 
                    showError={categoryError} 
                    errorMsg="Invalid category" 
                    activeValue={activeBudget?.category} 
                    usedItems={budgets.map(b=>b.category)}
                    usedField="category"/>
        
          <FormDiv label="Maximum Spend:" fieldName="max" placeholder="0.00" showError={maxError} errorMsg="Invalid amount"/>
            <DropDown 
              items={themes} label="Themes:" 
              setSelectedItem={setTheme} 
              isTheme={true} 
              showError={themeError}
              usedItems={budgets.map(b=>b.theme)}
              usedField="className"
              activeValue={activeBudget?.theme}
              errorMsg={"Must select a theme - 🟡"}
              /> 

    
     <div className="form-div pt-2">
       <button onClick={(e)=>handleBudgetAction(e)} className="btn btn-full btn-dark">{btnText}</button>
     </div>
   </form>
  </div>
  )
}

export default BudgetsModal