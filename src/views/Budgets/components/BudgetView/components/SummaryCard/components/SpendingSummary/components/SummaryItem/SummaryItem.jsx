import React, {useEffect,useState} from 'react'
import { ThemeLine } from '../../../../../../../../../../components'
import { useAppContext } from '../../../../../../../../../../context/AppContext';
import {  getMonthlyTotals } from '../../../../../../../../../../utils/helpers';
import "./SummaryItem.css"

const SummaryItem = ({item,transactions}) => {
  const [total,setTotal] = useState(0)
  const {isDemo} = useAppContext();
  // console.log("Item",item);

  useEffect(()=>{
    //only grab transactions that occured present month
    let monthlyTotal = getMonthlyTotals(transactions,isDemo)

  
    setTotal(monthlyTotal)
  },[])

  return (
    <li key={item.id} className="flex justify-between summary-item gap-1 item-border-bottom">

    <div className="flex-center gap-1">
        <ThemeLine theme={item.theme}/>
        <h4 className="mid-thin">{item.category} {total > item.max && <span>-<span className="bold"> over limit</span></span>}</h4>
    </div>
    <div className="flex-center gap-1">
        {transactions.length && <h3 className={`${total > item.max ? 'error-text' : ''}`}>${total.toFixed(2)}</h3>}
        <h5 className="mid-thin no-whitespace"> of ${parseFloat(item.max).toFixed(2)}</h5>
    </div>
</li>
  )
}

export default SummaryItem