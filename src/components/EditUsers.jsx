import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditAUser from "./EditAUser";
import { useNavigate, useLocation } from "react-router-dom";


const Users = ({editUser, setEditUser, id, setId}) => {

    

    // testing useRefreshToken hook
    // const refresh = useRefreshToken();

    const [users, setUsers] = useState();
   
    


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
                console.error(error.message);
                navigate("/login", { state: { from: location }, replace: true });
            }
        }

        getUsers();

        // cleanup function
        return () => {
            // don't set state if component unmounts
            isMounted = false;
            // cancel request if component unmounts
            // controller.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEdit = async (id) => {
        try {
            const aUser = users.find(user => (user._id).toString() === id);

            if (aUser) {
                setEditUser(aUser.username);
            }
            setId(id);
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
                                    {users.map((user, i) => <EditAUser key={i} user={user} handleEdit={handleEdit} />)}
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