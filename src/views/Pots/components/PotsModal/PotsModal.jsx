import React, {useState, useRef, useEffect} from 'react'
import { ModalHeader,DropDown,FormDiv, FormErrorCaption } from '../../../../components'
import {themes} from "../../../../const"
import { useAppContext } from '../../../../context/AppContext'
import "./PotsModal.css"

const PotsModal = ({modalTitle,btnText,activePot=null}) => {
  const [title,setTitle] = useState("")
  const [titleError,setTitleError] = useState("")
  // const [target,setTarget] = useState("")
  // const [starting,setStarting] = useState("")
  const [theme,setTheme] = useState("")
  const [targetError,setTargetError] = useState(false);
  const {add_pot,edit_item} = useAppContext();
  const formRef = useRef();

  useEffect(()=>{
    if(activePot){
    console.log('populate fields!',activePot);
    setTitle(activePot.name)
    setTheme(activePot.theme)
    console.log(formRef.current);
    formRef.current.querySelector("#target").value=activePot.target;
    formRef.current.querySelector("#starting").value=activePot.achieved
    }
    else{
      setTitle("");
      setTheme("");
      formRef.current.querySelector("#target").value="";
      formRef.current.querySelector("#starting").value="";
    }
    // formRef.current.querySelector("")
  },[activePot])



  const handleFormSubmit=(e)=>{
    e.preventDefault();
      if(btnText == "Edit"){
        console.log('handle edit!')
        handleEditPot();
      }else{
        handleAddPot()
      }
  }

  const handleAddPot=()=>{
    let isValid = true;
    let formData = new FormData(formRef.current);
        let potData ={
          name:formData.get("title"),
          target:parseInt(formData.get("target")),
          achieved:formData.get("starting") ? parseFloat(formData.get("starting")).toFixed(2) : 0,
          theme
        }
        if(potData.name == ''){
          isValid = false;
          setTitleError("Invalid name.");
        }
      if(potData.target == '' || isNaN(potData.target)){
        isValid = false;
        setTargetError(true);
      }

      console.log("potData",potData)

      if(!isValid){
        setTimeout(()=>{
          setTitleError("")
          setTargetError(false)
          },2000);

      }else{
          add_pot(potData)
          formData.set("title","");
          formData.set("target","");
          formData.set("starting","");
        }

      }


      const handleEditPot=()=>{
        console.log("handle edit fired -- ");
        console.log(activePot)
        let formData = new FormData(formRef.current);
        let newPotData ={
            name:formData.get("title"),
            target:parseFloat(formData.get("target")),
            achieved:parseFloat(formData.get("starting")),
            theme
        }
        // console.log(newPotData);
        let updatedFields ={};
        if(newPotData.name != "" && newPotData.name != activePot.name){
          updatedFields.name = newPotData.name;
        }
        if(newPotData.target != "" && !isNaN(newPotData.target) && newPotData.target != activePot.target){
          updatedFields.target = newPotData.target;
        }
        if(newPotData.achieved != "" && !isNaN(newPotData.achieved) && newPotData.achieved != activePot.achieved){
          updatedFields.achieved = newPotData.achieved;
        }
        if(newPotData.theme != activePot.theme.split("-")[1]){
          updatedFields.theme = `bg-${newPotData.theme}`
        }

        console.log("updatedFields",updatedFields)
        let collectionName = "pots"
        if(Object.keys(updatedFields).length)edit_item(activePot,updatedFields, collectionName);
      }

    


  return (
    <div className="modal bg-white">
        <ModalHeader title={modalTitle}/>
        <form ref={formRef} className="form">
          <div className="form-div">
            <label htmlFor="title">Pot name:</label>
            <input type="text" 
                   name="title" 
                   value={title} 
                   onChange={(e)=>{
                            if(e.target.value.length > 30)return
                            setTitle(e.target.value)
                            }} 
                  autoComplete="off" 
                  placeholder="Title..." 
                  className="form-control" />
              {titleError ?
                        <div>
                          <FormErrorCaption showError={titleError.length} msg={titleError}/>
                        </div>
                          :
                        <div className="character-count-alert-div">
                          <p>{30 - title.length > 0  ? `${30 - title.length} characters left` : 'Max Length'} </p>
                        </div>
              }   
          </div>
          <div className="form-row">
            <FormDiv label="target" fieldName="target" showError={targetError} errorMsg="Invalid target amount" placeholder="0" isMoney={true}/>
            <FormDiv label="starting" fieldName="starting" showError={false} errorMsg="" placeholder="0.00" isMoney={true}/>
          </div>
            <DropDown 
              items={themes} label="Themes:" 
              setSelectedItem={setTheme} 
              isTheme={true} 
              activeValue={theme}
              /> 
          <div className="form-div">
            <button onClick={(e)=>handleFormSubmit(e)} className="btn btn-dark btn-full">{btnText} Pot</button>
          </div>
        </form>
    </div>
  )
}

export default PotsModal