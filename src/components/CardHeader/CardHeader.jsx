import React, {useState,useEffect} from 'react'
import { useAppContext } from '../../context/AppContext'
import  ThemeDot  from '../ThemeDot/ThemeDot'
import { iconEllipsis } from '../../const'
import "./CardHeader.css"

const CardHeader = ({title,itemType,item,handleAction}) => {
  const [showDropDown,setShowDropDown] = useState(false);
  const {showModal} = useAppContext();
  // console.log("Item",item);

      useEffect(()=>{
        if(showModal){
          setShowDropDown(false);
        }
      },[showModal])
  return (
    <div className="justify-between relative">
        <div className="flex-center gap-1">
            <ThemeDot className={item.theme}/>
            <h2 className="no-whitespace capitalize mid-thin"><span className="bold">{title[0]}</span>{title.slice(1,title.length)}</h2>
        </div>
        <div>
            <button onClick={()=>setShowDropDown((showDropDown)=>!showDropDown)} className="btn transparent-btn">
                <img src={iconEllipsis} alt="" />
            </button>
            <div className={`edit-dropdown ${showDropDown ? 'show-dropdown' : 'hide-dropdown'}`}>
                <li>
                    <button onClick={()=>{handleAction("edit",item)}} className="no-whitespace transparent-btn btn btn-full capitalize">Edit {itemType}</button>
                </li>
                <li>
                    <button onClick={()=>{handleAction("delete",item)}} className="error-text no-whitespace transparent-btn btn btn-full capitalize">Delete {itemType}</button>
                </li>
            </div>
        </div>
    </div>
  )
}

export default CardHeader