import React, { useState } from 'react';
import EditUsers from "./EditUsers";
import useAuth from "../hooks/useAuth";
import { FaPen } from "react-icons/fa";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


const Editor = () => {

  const { setUsers } = useAuth();

  const [id, setId] = useState("");
  const [editUser, setEditUser] = useState("");

  // import axiosPrivate hook
  const axiosPrivate = useAxiosPrivate();



  const handleSubmit = async (id) => {
    
    if (!editUser) return
    try {
      const response = await axiosPrivate.put(`/users/${id}`, JSON.stringify({ username: editUser }));
      setEditUser("");
      setUsers(response?.data);
      // inbuilt-notification
      toast.success('successful')
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <>
      <section className='section'>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center section-intro">
              <h1>Welcome to the Editor Page</h1>
              <p>You must have been assigned an Editor's role.</p>
              <p>You have the ability to Edit a user.</p>
            </div>
          </div>
        

        
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 mb-2">
              <form action="" className="row" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="user" className="">User:</label>
                  <div className="d-flex">
                    <input
                      value={editUser}
                      onChange={(e) => setEditUser(e.target.value)}
                      type="text"
                      autoComplete="off"
                      id="user"
                      className="form-control me-2"
                    />
                    <button onClick={() => handleSubmit(id)} className="btn btn-primary"><FaPen /></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        
          <EditUsers
            setId={setId}
            setEditUser={setEditUser}
            id={id}
            editUser={editUser}
           />
        </div>
      </section>
    </>
  )
}

export default Editor