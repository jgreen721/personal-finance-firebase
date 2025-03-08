import React from 'react'
import {formatDate,formatAmount,parseAndReturnDate} from "../../../../utils/helpers"
import { Avatar } from '../../../../components'
import "./Table.css"

const Table = ({categories,data}) => {




  return (
    <table>
    <thead>
      <tr>
        {categories.map((category)=>(
          <th className={`grey-500-text mid-thin ${category.category == 'Amount' ? 'text-end' : ''}`} key={category.id}>{category.category}</th>
        ))}
      </tr>
    </thead>
    <tbody className="transactions-table-body">
      {data.map((t,idx)=>(
        <tr key={idx} className="transaction-table-row">
          <td className="flex-start gap-1">
            <Avatar img ={t.avatar}/>
            <span className="bold">{t.name}</span>
          </td>
          <td>{t.category}</td>
          <td>{parseAndReturnDate(formatDate(t.date))}</td>
          <td className="text-end">{formatAmount(t.amount)}</td>
        </tr>
      ))}
    </tbody>
</table>

  )
}

export default Table