import React from 'react'
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1)


  return (
    <section className='section'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Unauthorized</h1>
                    <p>You do not have access to the requested page.</p>
                    <div>
                        <button className="btn btn-primary" onClick={goBack}>Go back</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Unauthorized