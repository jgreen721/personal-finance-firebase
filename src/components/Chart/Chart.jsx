import React, {useState,useEffect} from 'react'
import { useAppContext } from '../../context/AppContext'
import { getMonthlyTotals, reduceTotal } from '../../utils/helpers'
import "./Chart.css"

const Chart = ({budgets}) => {
  const [budgetTotal,setBudgetTotal] = useState(0)
  const [spentTotal,setSpentTotal] = useState(0)
  const [conicBg,setConicBg] = useState("conic-gradient(red,blue,orange)")
  const {transactions,isDemo} = useAppContext();
  const EMPTY_BG = `conic-gradient(var(--grey900),black)`

   

    useEffect(()=>{
        let tempTotal = reduceTotal(budgets,"max");
        // console.log("tempTotal",tempTotal);
        setBudgetTotal(tempTotal)
        let tempSpentTotal = 0;
        budgets.forEach(b=>{
          let monthlyTotal = getMonthlyTotals(transactions.filter(t=>t.category == b.category),isDemo);
          tempSpentTotal+= monthlyTotal;
        })
        // console.log("transactiontotal",tempSpentTotal);

        setSpentTotal(tempSpentTotal)
    },[budgets])


    useEffect(()=>{
      // console.log("piece it together guerro--")
      let graphData=[]
if(spentTotal != 0){
  // let chartData = []
  let bgColor = `conic-gradient(`
  let degreeTracker=0;
  budgets.forEach(b=>{
    let graphObj = {};
    graphObj.category = b.category;
    graphObj.theme = b.theme;
    let spentTotalOnCategory = getMonthlyTotals(transactions.filter(t=>t.category == b.category),isDemo);
    console.log(`Category-${b.category}/ SpentTotal-${spentTotalOnCategory}`)
    let divider = spentTotalOnCategory < b.max ? b.max : spentTotalOnCategory
    let percent = parseFloat((divider/(budgetTotal).toFixed(2)));
    let endDegree = Math.floor(360 * percent);
    graphObj.initial = degreeTracker
    graphObj.degrees = endDegree;
    graphData.push(graphObj);
    let color = b.theme.split("-")[1]
    endDegree+= degreeTracker
    bgColor += `var(--${color}) ${degreeTracker}deg ${endDegree}deg,`
    degreeTracker = endDegree

  })

  console.log(graphData);

  bgColor = bgColor.split("");
  bgColor.pop();
  bgColor = bgColor.join("");
  bgColor += ")";
 

  setConicBg(bgColor)
}
else{
  setConicBg(EMPTY_BG)
}
    },[spentTotal])

   
  return (
    <div className="chart-div flex-center">
      <div style={{background:conicBg}} className="chart">
        <div className="chart-cover"></div>
        <div className="chart-center flex-column flex-center">
          <h2>${spentTotal.toLocaleString("en")}</h2>
          <h4 className="mid-thin grey-500-text">of ${budgetTotal.toLocaleString("en")} limit</h4>
        </div>
      </div>
    </div>
  )
}

export default Chart