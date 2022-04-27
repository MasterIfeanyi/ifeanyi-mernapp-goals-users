import React from 'react'

const User = ({user, handleDelete}) => {
  return (
    <div className="item">
      <label className="item-text">
        {user.username}
      </label>
      <div className='buttons'>
        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
      </div>
    </div>      
  )
}

export default User