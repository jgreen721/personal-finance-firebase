import React, {useEffect, useState} from 'react'
import "./ProgressSection.css"

const ProgressSection = ({pot,caption,newAmt=0}) => {
    const [newAmount,setNewAmount] = useState(0)
  // console.log("newAmt",newAmt)

  useEffect(()=>{
    //used to prevent errors from parseInt("") == newAmt is a STRING
    if(newAmount == 0 && isNaN(newAmt))return;
      if(!isNaN(newAmt)){
        setNewAmount(newAmt);
      }
      else{
        setNewAmount(0);
      }
  },[newAmt])

  const calcAndRenderPercent = (achieved,target)=>{
    let percent = parseInt((achieved/target) * 100)
    percent = percent > 100 ? 100 : percent;
    percent = percent < 0 ? 0 : percent;
      return percent 
  }

  const displayNewAmount=()=>{
    let currTotal = parseFloat(pot?.total);  
    currTotal += newAmount;
    currTotal = currTotal > 0 ? currTotal : 0;
    currTotal = currTotal < pot.target ? currTotal : pot.target;
    currTotal = currTotal.toFixed(2);
    // console.log("CurrTotal",pot.achieved);
    return currTotal;
  }


  return (
    <div className="pot-progress-content my-2">
    <div className="justify-between">
      <p>{caption}</p>
      <h1>${displayNewAmount()}</h1>
    </div>
    <div className="progress-bar">
      <div style={{"--width":`${calcAndRenderPercent(pot.total,pot.target)}%`}} className={`progress ${pot.theme} `}></div>
      <div className={`added-progress ${pot.theme == "bg-green" ? "bg-cyan" : "bg-green"}`} style={{left:`${calcAndRenderPercent(pot.total,pot.target)+.1}%`,width:`${calcAndRenderPercent(newAmount,pot.target)}%`}}></div>
      {newAmount < 0 && <div className={`minus-progress ${pot.theme == "bg-red" ? "bg-purple" : "bg-red"}`} style={{width:`${calcAndRenderPercent(pot.total,pot.target)+.1}%`,transform:`scaleX(${calcAndRenderPercent(Math.abs(newAmount),pot.total)}%)`}}></div>}
    </div>
    <div className="justify-between">
      <p>{calcAndRenderPercent(parseFloat(pot.total) + newAmount,pot.target)}%</p>
      <p>Target of ${pot.target}</p>
    </div>
  </div>
  )
}

export default ProgressSection