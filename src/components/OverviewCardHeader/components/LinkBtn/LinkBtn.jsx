import React from 'react'
import {Link} from "react-router-dom"
import {iconCaretRight} from "../../../../const"
import "./LinkBtn.css"

const LinkBtn = ({text,link}) => {
  return (
    <Link to={link} className="dark-text flex-center gap-1">
    <h5 className="text-dark capitalize mid-thin">{text}</h5>
    <img src={iconCaretRight} alt="caret"/>
    </Link>
  )
}

export default LinkBtn