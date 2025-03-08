import React from 'react'
import {DropDown, SearchFormDiv} from "../../../../components"
import { orderBy,categories,iconSortMobile,iconFilterMobile } from '../../../../const'
import "./SearchRow.css"

const SearchRow = ({setCategory,setSortBy,setSearchFor}) => {

  

  return (
    <div className="transaction-search-row flex justify-between gap-1">
      <SearchFormDiv setSearchFor={setSearchFor}/>
      <div className="flex gap-1">
          <DropDown items={orderBy} label="Sort By" setSelectedItem={setSortBy} isFlex={true} mobileIcon={iconSortMobile}/>
          <DropDown items={categories} label="Category" setSelectedItem={setCategory} isFlex={true} mobileIcon={iconFilterMobile}/>
      </div>
    </div>
  )
}

export default SearchRow