import React from 'react'
import { iconCaretLeft, iconCaretRight } from '../../const'

import "./PaginationRow.css"

const PaginationRow = ({currPage,setCurrPage,pages,pageTotal}) => {


  const handleChangePage=(page,idx)=>{
    if(page != "...")setCurrPage(page);
    else{
    if(currPage > pageTotal - 3){
      setCurrPage(pageTotal - 3)
      console.log('setCurrPage!!',(pages.length))
    }
    else if(currPage < 3){
      setCurrPage(4);
    }
    else{
      console.log("now what asshole!")
      let currIdx = pages.indexOf(currPage);
      if(currIdx > idx){
        setCurrPage(currPage-2)
      }else{
        setCurrPage(currPage+2)
      }
    }
    }
  
    
  }
  return (
    <div className="pagination-row">
       
    <button onClick={()=>setCurrPage((currPage)=>currPage-1)} className={`btn bg-transparent flex gap-2 absolute-left-btn absolute-page-btn ${currPage == 1 ? 'full-blur' : 'clear-blur'}`}>
        <img src={iconCaretLeft} alt="" />
       <span className="desktop-tablet"> Prev</span>
      </button>

      <ul className="pages">
      {pages.map((page,idx)=>(
        <button onClick={()=>handleChangePage(page,idx)} key={idx} className={`btn ${currPage == page ? 'selected-page-btn' : 'bg-transparent'}`}>
          {page} 
        </button>
      ))}
      </ul>
    
     <button onClick={()=>setCurrPage((currPage)=>currPage+1)} className={`btn bg-transparent flex gap-2 absolute-right-btn absolute-page-btn ${currPage == pageTotal ? 'full-blur' : 'clear-blur'}`}>
         <span className="desktop-tablet"> Next</span>
        <img src={iconCaretRight} alt="" />
     </button>
     
    </div>
  )
}

export default PaginationRow