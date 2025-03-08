import React from 'react'
import { iconCaretLeft, iconCaretRight } from '../../const'

import "./PaginationRow.css"

const PaginationRow = ({currPage,setCurrPage,pages}) => {
  return (
    <div className="pagination-row">
       
    <button onClick={()=>setCurrPage((currPage)=>currPage-1)} className={`btn bg-transparent flex gap-2 absolute-left-btn absolute-page-btn ${currPage == 1 ? 'full-blur' : 'clear-blur'}`}>
        <img src={iconCaretLeft} alt="" />
       <span className="desktop-tablet"> Prev</span>
      </button>

      <ul className="pages">
      {pages.map(page=>(
        <button onClick={()=>setCurrPage(page)} key={page} className={`btn ${currPage == page ? 'selected-page-btn' : 'bg-transparent'}`}>
          {page} 
        </button>
      ))}
      </ul>
    
     <button onClick={()=>setCurrPage((currPage)=>currPage+1)} className={`btn bg-transparent flex gap-2 absolute-right-btn absolute-page-btn ${currPage == pages.length ? 'full-blur' : 'clear-blur'}`}>
         <span className="desktop-tablet"> Next</span>
        <img src={iconCaretRight} alt="" />
     </button>
     
    </div>
  )
}

export default PaginationRow