import React from 'react'
import { emptyRecurringImg } from '../../../../const'
import "./EmptyRecurring.css"

const EmptyRecurring = () => {
  return (
    <div className="empty-recurring flex-column flex-center">
        <h1>No recurring transactions.</h1>
        <img className="empty-recurring-img" src={emptyRecurringImg} alt="" />
      </div>
  )
}

export default EmptyRecurring