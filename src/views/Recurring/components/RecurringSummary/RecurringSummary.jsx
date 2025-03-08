import React, {useEffect,useState} from 'react'
import { useAppContext } from '../../../../context/AppContext'
import { getUpcomingBills } from '../../../../utils/helpers'
import "./RecurringSummary.css"

const RecurringSummary = ({recurring}) => {
  //calculate totals based on date
  const stats = [
    {id:1,title:"Paid Bills",amount:"",text:"text-dark"},
    {id:2,title:"Total Upcoming",amount:"",text:"text-dark"},
    {id:3,title:"Due Soon",amount:"",text:"error-text"},
  ]
  const [paidTransactions,setPaidTransactions] = useState([])
  const [upcomingTransactions,setUpcomingTransactions] = useState([])
  const [dueSoonTransactions,setDueSoonTransactions] = useState([])
  const {isDemo} = useAppContext();

  useEffect(()=>{

    let currDay = new Date().getUTCDate();
    let currMonth = new Date().getUTCMonth() + 1;
    
    if(isDemo){
        currDay = 2;
        currMonth = 8
    }

    let {tempPaidTransactions,tempDueSoonTransactions,tempUpcomingTransactions} = getUpcomingBills(recurring,currDay,currMonth);
    setPaidTransactions(tempPaidTransactions);
    setDueSoonTransactions(tempDueSoonTransactions);
    setUpcomingTransactions(tempUpcomingTransactions);
  },[recurring])
  return (
    <div className="recurring-content-card bg-white">
      <h3 className="pb-2">Summary</h3>
        <li className={`flex justify-between py-1 item-border-bottom`}>
          <h4 className="mid-thin">Paid Bills</h4>
          <h4>{paidTransactions.length}(${Math.abs(paidTransactions.reduce((a,b)=>a+b?.amount,0))})</h4>
        </li>
          <li className={`flex justify-between py-1 item-border-bottom`}>
          <h4 className="mid-thin">Total Upcoming</h4>
          <h4>{upcomingTransactions.length}(${Math.abs(upcomingTransactions.reduce((a,b)=>a+b?.amount,0))})</h4>
        </li>
          <li className={`flex justify-between py-1 item-border-bottom`}>
          <h4 className="mid-thin">Due Soon</h4>
          <h4>{dueSoonTransactions.length}(${Math.abs(dueSoonTransactions.reduce((a,b)=>a+b?.amount,0))})</h4>
        </li>
      
    </div>
  )
}

export default RecurringSummary