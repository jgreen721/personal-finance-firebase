import React, {useState,useEffect} from 'react'
import {  DropDown, SearchFormDiv,PaginationRow } from '../../../../components';
import { orderBy} from '../../../../const';
import { useAppContext } from '../../../../context/AppContext';
// import { formatDate,formatAmount } from '../../../../utils/helpers';
import {RecurringTableRow} from "./components"
import "./RecurringTransactionsTable.css"

const RecurringTransactionsTable = ({recurring,searchFor,setSearchFor,setSortBy}) => {
  const [currMonth,setCurrMonth] = useState("14");
  const [currDay,setCurrDay] = useState("50");
  // const [transactionMonth,setTransactionMonth] = useState("14");
  // const [transactionDay,setTransactionDay] = useState("50");
  const {isDemo} = useAppContext()
  const [currPage,setCurrPage] = useState(1);
  const [batch,setBatch] = useState([]);
  const [pages,setPages] = useState([]);
  const PER_PAGE = 10;


  // console.log("recurring",recurring)


  const handleRenderedBatchAndPages = (viewableTransactions)=>{
    
    let lastIdx = currPage * PER_PAGE;
    let firstIdx = lastIdx - PER_PAGE;
    let temp_batch = viewableTransactions.slice(firstIdx,lastIdx);
    setBatch(temp_batch);
    // console.log("tempBatch",temp_batch)
    let temp_pages = []
    for(let i=1;i<(viewableTransactions.length/PER_PAGE) + 1;i++){
        temp_pages.push(i)
    }

    setPages(temp_pages);
  }

  useEffect(()=>{
handleRenderedBatchAndPages(recurring);
  },[recurring,currPage])



  useEffect(()=>{
    if(isDemo){
      // setCurrMonth(new Date().getUTCMonth);
      // setCurrDay(new Date().getUTCDay);
      setCurrMonth(8);
      setCurrDay(1);
    }
    else{
      let tempCurrDay = new Date().getUTCDate();
      let tempCurrMonth = new Date().getUTCMonth() + 1
          console.log(tempCurrDay,tempCurrMonth)
          setCurrDay(tempCurrDay);
          setCurrMonth(tempCurrMonth);
    }
},[isDemo])




  return (
    <div className="recurring-transaction-container parent-content-card bg-white">
     <div className="flex justify-between gap-1">
      <SearchFormDiv searchFor={searchFor} setSearchFor={setSearchFor} />
       <div>
          <DropDown items={orderBy} label="Sort by" setSelectedItem={setSortBy} isFlex={true}/>
       </div>
     </div>
      
        <ul className="recurring-categories flex justify-between py-2 desktop-tablet">
          <li className="recurring-category-item flex-2">
            <h4 className="mid-thin">Bill Title</h4>
          </li>
          <li className="recurring-category-item flex-1 text-end">
            <h4 className="mid-thin">Due Date</h4>
          </li>
          <li className="recurring-category-item flex-1 text-end">
            <h4 className="mid-thin">Amount</h4>
          </li>
        </ul>
        <ul className="recurring-items">
        {batch.map((recurringTransaction,idx)=>(
                <RecurringTableRow key={idx} currMonth={currMonth} currDay={currDay} transaction={recurringTransaction}/>
            ))}
        </ul>
        <div className="pt-2">
        <PaginationRow pages={pages} currPage={currPage} setCurrPage={setCurrPage}/>
        </div>

    </div>
  )
}

export default RecurringTransactionsTable