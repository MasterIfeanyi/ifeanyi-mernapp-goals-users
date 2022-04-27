import React from 'react'
import Users from "./Users";

const Admin = () => {

  return (
    <>
      <section className='section'>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center section-intro">
              <h1>Welcome to the Admin Page</h1>
              <p>You must have been assigned an Admin role.</p>
              <p>You have the ability to delete a user.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <Users/>
        </div>
      </section>
    </>
  )
}

export default Admin