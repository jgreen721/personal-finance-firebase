import React from 'react'
import { iconSearch } from '../../const'
import "./SearchFormDiv.css"

const SearchFormDiv = ({setSearchFor}) => {
  return (
    <div className="search-form-div">
        <input type="text" name="searchFor" onChange={(e)=>setSearchFor(e.target.value)} className="form-control" placeholder="Search" autoComplete="off" />
        <div className="search-input-icon">
          <img src={iconSearch} alt="searchIcon" />
        </div>
      </div>
  )
}

export default SearchFormDiv