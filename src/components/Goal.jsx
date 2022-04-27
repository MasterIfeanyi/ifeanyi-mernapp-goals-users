import React from 'react'
import {Link} from "react-router-dom"

const Goal = ({goal, handleDelete}) => {
  return (
    <div className="item">
        <label className="item-text">
        {goal.text}
        </label>
        <div className='buttons'>
            <button className="btn btn-danger" onClick={() => handleDelete(goal._id)}>Delete</button>
            <Link to={`/edit/${goal._id}`}><button className="btn btn-primary">Edit</button></Link>
        </div>
    </div>
  )
}

export default Goal