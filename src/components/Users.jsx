import React, { useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import User from "./User";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth"

toast.configure();

const Users = () => {

    // testing useRefreshToken hook
    // const refresh = useRefreshToken();

    const {users, setUsers} = useAuth();


    const navigate = useNavigate();
    const location = useLocation();


    // import axiosPrivate hook
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        let isMounted = true;
        // used by axios to cancel request
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    // option to cancel request
                    signal: controller.signal
                })
                console.log(response?.data);
                // set users state when component mounts
                isMounted && setUsers(response?.data);
            } catch (error) {
                if (process.env.NODE_ENV === "production" && error) {
                    console.log(error.message);
                } else {
                    // when refreshToken expires
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
        }

        getUsers();

        // cleanup function
        return () => {
            // don't set state if component unmounts
            isMounted = false;
            // cancel request if component unmounts
            controller.abort();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/users/${id}`);
            setUsers(response?.data);
            // inbuilt-notification
            toast.success('successful');
        } catch (error) {
            console.error(error.message);
        }
    }




  return (
    <>
        <div className="row d-flex justify-content-center">
            {
                users?.length
                    ? (
                        <>
                            <h3>Users</h3>
                            <div className="col-12"> 
                                {users.map((user, i) => <User key={i} user={user} handleDelete={handleDelete} />)}
                            </div>
                        </>
                    ) : (
                        <div className="col-12 intro">
                            <p className="lead mt-3">No users to display</p>
                        </div>
                    )
            } 
        </div>
    </>
  )
}

export default Users