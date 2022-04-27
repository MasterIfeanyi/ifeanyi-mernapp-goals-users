import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import {FaPlus} from "react-icons/fa"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Goal from "./Goal"
import useAuth from '../hooks/useAuth';

const CreateNotes = () => {

    const {goals, setGoals} = useAuth()
    const [text, setText] = useState("")

    const navigate = useNavigate();
    const location = useLocation();

    
    const axiosPrivate = useAxiosPrivate();



    useEffect(() => {
        let isMounted = true;
        // used by axios to cancel request
        const controller = new AbortController();

        const getGoals = async () => {
            try {
                const response = await axiosPrivate.get("/goals", {
                    // option to cancel request
                    signal: controller.signal
                })
                console.log(response?.data);
                // set users state when component mounts
                isMounted && setGoals(response?.data);
            } catch (error) {
                console.error(error);
            }
        }


        getGoals();
        
        

        // cleanup function
        return () => {
            // don't set state if component unmounts
            isMounted = false;
            // cancel request if component unmounts
            controller.abort();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { text }
        try {
            await axiosPrivate.post("/goals", data)
            setText("")
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/goals/${id}`)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="col-md-7 mb-2">
                    <form action="" className="row" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="goal" className="">Goal:</label>
                            <div className="d-flex">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    type="text"
                                    autoComplete="off"
                                    id="goal"
                                    className="form-control me-2"
                                />
                                <button className="btn btn-primary"><FaPlus /></button>
                            </div>
                        </div>
                    </form>
                </div>
               
                {
                    goals?.length
                        ? (
                            <>
                                <h4>Goals</h4>
                                <div className="col-12">
                                    {goals.map((goal, i) => <Goal key={i} goal={goal} handleDelete={handleDelete}/>)}
                                </div>
                            </>
                        ) : (
                            <div className="col-12 intro">
                                <p>You have no goals to display</p>
                                <p className="lead mt-3">Create A Goal</p>
                            </div>
                        )
                }
            </div>  
        </>
    )
}

export default CreateNotes