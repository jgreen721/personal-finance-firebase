import React, {useEffect,useState} from 'react'
import { ModalOverlay,Empty,PaginationRow } from '../../components'
import { TransactionModal,Table, SearchRow,MobileList } from './components'
import { useAppContext } from '../../context/AppContext'
import { emptyTransactionsImg } from '../../const'
import "./Transactions.css"

const Transactions = () => {
  const {transactions,isDemo} = useAppContext();
  const tableCategories =[
    {id:1,category:"Recipient/Sender"},
    {id:2,category:"Category"},
    {id:3,category:"Transaction Date"},
    {id:4,category:"Amount"},
  ]
  const [currPage,setCurrPage] = useState(1);
  const [batch,setBatch] = useState([]);
  const [pages,setPages] = useState([]);
  const PER_PAGE = 10;
  const [category,setCategory] = useState("All");
  const [sortBy,setSortBy] = useState("");
  const [searchFor,setSearchFor] = useState("")
  const [pageTotal,setPageTotal] = useState(0)
  const [pageOffset,setPageOffset] = useState(1)


   useEffect(()=>{
    if(innerWidth < 650){
      // adjust page offset
      setPageOffset(0);
    }
   if(transactions.length){
        let temp_transactions = [...transactions]
        if(category != "All") temp_transactions = temp_transactions.filter(t=>t.category == category);
        // console.log("temp",temp_transactions);

        if(sortBy == "Highest")temp_transactions = temp_transactions.sort((a,b)=>b.amount - a.amount)
        if(sortBy == "Lowest")temp_transactions = temp_transactions.sort((a,b)=>a.amount - b.amount)
        if(sortBy == "A-Z")temp_transactions = temp_transactions.sort((a,b)=>a.name.charCodeAt(0) - b.name.charCodeAt(0))
        if(sortBy == "Oldest")temp_transactions = temp_transactions.sort((a,b)=>new Date(a.date).getTime() - new Date(b.date).getTime())
        if(sortBy == "Latest")temp_transactions = temp_transactions.sort((a,b)=>new Date(b.date).getTime() - new Date(a.date).getTime())
        handleRenderedBatchAndPages(temp_transactions);
      
    }

   },[transactions,category,currPage,sortBy])


   useEffect(()=>{
      setCurrPage(1);
   },[category])






   const handleRenderedBatchAndPages = (viewableTransactions)=>{
    // let tempTransactions = viewedTransactions;
  //   console.log("Transactions",transactions)
    let lastIdx = currPage * PER_PAGE;
    let firstIdx = lastIdx - PER_PAGE;
    let temp_batch = viewableTransactions.slice(firstIdx,lastIdx);
    setBatch(temp_batch);
    let total_pages = 0
    let batched_pages = []
    for(let i=1;i<(viewableTransactions.length/PER_PAGE) + 1;i++){
        total_pages++
        batched_pages.push(i);
    }
    total_pages--;
    if(total_pages > 5){
      // console.log("batch da pages!")
      // let batched_pages = []
      let lastPage = total_pages

      if(currPage  < 4){
        batched_pages = [1,2,3,"...",lastPage]
      }
      else if(lastPage - currPage < 2){
        batched_pages = [1,"...",lastPage-2,lastPage-1,lastPage]
      }
      else{
        if(pageOffset == 1)batched_pages = [1,"...",parseInt(currPage)-1,currPage,parseInt(currPage)+1,"...",lastPage];
        else batched_pages = [1,"...",currPage,"...",lastPage];
      }
    }

    setPages(batched_pages);
    setPageTotal(total_pages)
  }

  useEffect(()=>{
      // console.log("Searching for...",searchFor)
      let temp_transactions = [...transactions];
      temp_transactions = temp_transactions.filter(item => 
        item.name.toLowerCase().includes(searchFor.toLowerCase())
      );
      handleRenderedBatchAndPages(temp_transactions)
      if(currPage != 1)setCurrPage(1);
  },[searchFor])





return (
    <div>
        <ModalOverlay>
          <TransactionModal/>
      </ModalOverlay>
  <div className="overflow-container">
      <div className="parent-content-card bg-white">
        <SearchRow setSearchFor={setSearchFor} setCategory={setCategory} setSortBy={setSortBy}/>
        {transactions.length > 0
        ?
        <div>
            <div className="desktop-tablet">
              <Table categories={tableCategories} data={batch}/>
            </div>
            <div className="mobile">
              <MobileList data={batch}/>
            </div>
            <PaginationRow pages={pages} currPage={currPage} pageTotal={pageTotal} setCurrPage={setCurrPage} pageOffset={pageOffset}/>

        </div>
        :
        <Empty img={emptyTransactionsImg} category="transaction"/>
}
      </div>
    </div>
    </div>
  )
}

export default Transactions