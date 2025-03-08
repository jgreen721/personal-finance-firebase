import React, {useEffect,useState} from 'react'
import { ThemeLine } from '../../../../../../../../components';
import { useAppContext } from '../../../../../../../../context/AppContext';
import { getMonthlyTotals } from '../../../../../../../../utils/helpers';
import "./ProgressSection.css";

const ProgressSection = ({budget,transactions}) => {
    const [spent,setSpent] = useState(0);
    const [remaining,setRemaining] = useState(parseFloat(budget.max));
    const {isDemo} = useAppContext();


    useEffect(()=>{
        if(transactions.length){
            // console.log("calculate spent totals for --",budget.category,transactions.length);
            let tempTotal = getMonthlyTotals(transactions,isDemo);
            setSpent(tempTotal);
            let tempRemaining = parseFloat(budget.max) - tempTotal > 0 ? parseFloat(budget.max) - tempTotal : 0
            setRemaining(tempRemaining)
        }
    },[transactions])
  return (
    <div>
        <h5 className="mid-thin">Maximum of ${budget.max}</h5>
        <div className="budget-progress-parent">
            <div style={{width:`${parseInt(Math.abs(spent))/parseInt(budget.max) * 100}%`}} className={`progress budget-card-progress ${budget.theme}`}></div>
        </div>
        <div className="flex">
                <div className="flex-1 flex gap-1">
                    <ThemeLine theme={budget.theme}/>
                    <div>
                    <p className="pb-1 mid-thin">Spent</p>
                    <h5>${Math.abs(spent).toFixed(2)}</h5>
                    </div>
                </div>
            <div className="flex-1">
                <div>
                    <p className="pb-1 mid-thin">Remaining</p>
                    <h5>${remaining.toFixed(2)}</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProgressSection