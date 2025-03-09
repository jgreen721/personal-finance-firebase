import React, {useEffect, useState} from 'react'
import { FormErrorCaption } from '..'
import { iconCaretDown, iconSelected } from '../../const'
import { useAppContext } from '../../context/AppContext'
import ThemeDot from "../ThemeDot/ThemeDot"
import "./DropDown.css"

const DropDown = ({items,label,setSelectedItem,isFlex=false,mobileIcon = null,isTheme=false,activeValue=null,zIndex=1,showError=false,errorMsg="",usedItems=[],usedField=null}) => {
    const [showDropDown,setShowDropDown] = useState(false);
    const [selectedValue,setSelectedValue] = useState(null);
    const {showModal} = useAppContext();



  
   useEffect(()=>{
        if(activeValue){
            let tempValue = activeValue
            if(tempValue.indexOf("-") != -1){
            //checking/formatting theme value from bg-{color} to {color}
            tempValue = tempValue.split("-")[1]
            }
            setSelectedValue(tempValue)
            setSelectedItem(tempValue);
        }
        else{
            setSelectedValue(null);
        }
    },[activeValue]);


    useEffect(()=>{
        if(!showModal){
            setShowDropDown(false);
        }
    },[showModal])

  



    const handleSelectItem=(item)=>{
        setSelectedValue(item);
        setSelectedItem(item);
    }

return (
    <div className={`dropdown-container ${zIndex == 1 ? 'default-z' : 'high-z'}`}>
        <div className={`${mobileIcon != null && 'desktop-tablet'} ${isFlex ? 'flex flex-center gap-1' : ' '}`}>
            <label htmlFor="dropdown-select" className="capitalize no-whitespace desktop-tablet">{label}</label>
            <div className="fake-input-display justify-between gap-1">
                <div className="flex gap-1">
                    <h4 className={`${selectedValue ? 'dark-text' : 'muted-placeholder'} capitalize no-whitespace`}>{selectedValue ? selectedValue : label}</h4>
                    {isTheme && <ThemeDot className={`bg-${selectedValue}`}/>}
                </div>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setShowDropDown(showDropDown=>showDropDown=!showDropDown)}} className="transparent-btn caret-dropdown-btn">
                    <img className={`${showDropDown ? 'rotate-down' : 'rotate-up'} caret-img`} src={iconCaretDown} alt="caret"/>
                </button>
            {/* <input type="hidden" value={selectedValue} name={label}/> */}
            </div>
        </div>
        <FormErrorCaption showError={showError} msg={errorMsg}/>

        {mobileIcon && 
        <div className="mobile">
            <button onClick={()=>setShowDropDown(showDropDown=>showDropDown=!showDropDown)} className="btn transparent-btn">
                <img src={mobileIcon} alt="" />
            </button>
        </div>
        }
        <ul className={`dropdown-list ${showDropDown ? 'show-dropdown' : "hide-dropdown"} ${mobileIcon ? 'mobile-offset-left' : ''}`}>
        {items.map(item=>(
            <li onClick={()=>handleSelectItem(item.value)} key={item.id} className={`${usedItems.findIndex(usedItem=>usedItem == item[usedField]) == -1 ? '' : 'disable-dropdownitem'} dropdown-item justify-between`}>
                {isTheme ? 
                <div className="theme-dot-name-row flex gap-1">
                    <ThemeDot className={item.className}/>
                        <h4 className="capitalize mid-thin">{item.value}</h4>
                </div>
                :
                <h4 className="no-whitespace">{item.value}</h4>
}
                <img className={`${selectedValue == item.value ? 'show-selected-icon' : 'hide-selected-icon'} dropdown-selected-icon `} src={iconSelected} alt="selected-icon"/>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default DropDown