import React, {useState,useEffect} from 'react'
import { Empty } from '../../components'
import { RecurringSummary,Total,RecurringTransactionsTable} from './components'
import { emptyRecurringImg } from '../../const'
import { useAppContext } from '../../context/AppContext'
import "./Recurring.css"
import { getMonthlyTotals } from '../../utils/helpers'

const Recurring = () => {
  const {transactions,isDemo,recurring} = useAppContext();
  const [total,setTotal] = useState(0);
  const [localRecurring,setLocalRecurring] = useState([]);
  const [searchFor,setSearchFor] = useState("");
  const [sortBy,setSortBy] = useState("");
  // const recurringTransactionsRef = useRef();




  useEffect(()=>{
    let tempTotal = 0;
    tempTotal = getMonthlyTotals(recurring,isDemo)
    setTotal(tempTotal)
    setLocalRecurring(recurring)


  },[recurring]);


  useEffect(()=>{
      let tempTransactions = recurring;
      tempTransactions = tempTransactions.filter(item => 
        item.name.toLowerCase().includes(searchFor.toLowerCase())
      );
      setLocalRecurring(tempTransactions)

      if(searchFor == ""){
        setLocalRecurring(recurring)
      }

  },[searchFor])

  useEffect(()=>{

    let temp_transactions = recurring;
  

    if(sortBy == "Highest")temp_transactions = temp_transactions.sort((a,b)=>b.amount - a.amount)
    if(sortBy == "Lowest")temp_transactions = temp_transactions.sort((a,b)=>a.amount - b.amount)
    if(sortBy == "A-Z")temp_transactions = temp_transactions.sort((a,b)=>a.name.charCodeAt(0) - b.name.charCodeAt(0))
    if(sortBy == "Oldest")temp_transactions = temp_transactions.sort((a,b)=>new Date(a.date).getTime() - new Date(b.date).getTime())
    if(sortBy == "Latest")temp_transactions = temp_transactions.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime())
    // console.log(temp_transactions);
    setLocalRecurring([...temp_transactions])
  },[sortBy])

  return (
    recurring.length 
    ? 
      <div className="recurring-view-container">
          <div className="recurring-summary-column">
            <Total total={total}/>
            <RecurringSummary recurring={recurring}/>
          </div>
          <div className="recurring-transactions-column">
              <RecurringTransactionsTable setSortBy={setSortBy}  searchFor={searchFor} setSearchFor={setSearchFor} recurring={localRecurring}/>
          </div>
      </div>
    :
    // <EmptyRecurring/>
    <Empty img={emptyRecurringImg} category={"recurring"}/>

  )
}

export default Recurring