import React from 'react'
import "./Avatar.css"

const Avatar = ({img}) => {
  return (
    <div className="avatar-div">
        <img className="avatar-img" src={img} alt="avatar-img" />
    </div>
  )
}

export default Avatar