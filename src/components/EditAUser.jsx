import React from 'react'

const EditAUser = ({user, handleEdit}) => {
  return (
    <div className="item">
      <label className="item-text">
        {user.username}
      </label>
      <div className='buttons'>
        <button className="btn btn-success" onClick={() => handleEdit(user._id)}>Edit</button>
      </div>
    </div>      
  )
}

export default EditAUser