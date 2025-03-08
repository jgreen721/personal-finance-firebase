import React, {useState, useEffect} from 'react'
import { iconCaretRight } from '../../../../../../../../const'
import { LatestItem } from './components'
import "./LatestSpending.css"

const LatestSpending = ({transactions}) => {
    const [showAll,setShowAll] = useState(false)
    const [latestTransactions,setLatestTransactions] = useState(transactions.slice(0,3))


    useEffect(()=>{
        if(showAll){
            setLatestTransactions(transactions);
        }else{
            setLatestTransactions(transactions.slice(0,3));

        }
    },[showAll])
  return (
    <div className="latest-spending-card mt-2">
    <div className="flex justify-between pb-2">
        <h3 className="bol">Latest Spending</h3>
        <div className="flex-start gap-1">
            <button onClick={()=>setShowAll((showAll)=>showAll=!showAll)} className="btn flex  gap-1 transparent-btn">
            <h5>{showAll ? 'Latest Only' : 'See All'}</h5>
            <div className="icon-div">
                <img src={iconCaretRight} alt="" />
            </div>
            </button>
        </div>
    </div>
    <ul className="transactions-list">
        {latestTransactions.map(transaction=>(
            <LatestItem key={transaction.id} item={transaction}/>
        ))}
    </ul>
    </div>
  )
}

export default LatestSpending