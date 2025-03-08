import React from 'react'
import {Link} from "react-router-dom"
import { useAppContext } from '../../context/AppContext'
import "./Empty.css"

const Empty = ({img,category}) => {
  const {setShowModal} = useAppContext();


  const formatText = (btnText = false)=>{
    let tempText = category;
    if(category[category.length-1] == "s"){
      if(btnText){
        tempText = tempText.slice(0,tempText.length-1);
      }else{
        tempText = tempText.slice(0,tempText.length-1);
        tempText += "(s)"
      }
    }
    return tempText;
  }
  return (
    <div className="empty-pots-container empty-container">
    <div className="empty-pots-img-div empty-img-div">
        <img className="empty-pots-img empty-img" src={img} alt="" />
    </div>
    <h2 className="mid-thin">You currently have <span className="bold">no</span> {formatText(false)} {category == "recurring" && <span>transactions.</span>}.</h2>
    {category == "recurring"
    ? 
    <Link className="btn-transparent" to="/transactions">
      <h3 className="text-dark mid-thin">Visit/Add Transactions</h3>
    </Link>
    :

    <button onClick={()=>setShowModal(true)} className="btn btn-dark capitalize">Add {formatText(true)}</button>
  }
</div>
  )
}

export default Empty