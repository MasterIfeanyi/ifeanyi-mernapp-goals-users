import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const EditGoal = () => {

    const { goals } = useAuth();

    const navigate = useNavigate();

    const goalPrivate = useAxiosPrivate();

    const { id } = useParams();
    const goal = goals.find(goal => (goal._id).toString() === id);

    const [editGoal, setEditGoal] = useState("")

    useEffect(() => {
        if (goal) {
            setEditGoal(goal.text);
        }
    }, [goal, setEditGoal])

    const handleEdit = async (e) => {
        e.preventDefault();
        const data = {text: editGoal}
        try {
            await goalPrivate.put(`/goals/${id}`, data);
            setEditGoal("");
            navigate("/");
        } catch (error) {
            console.error(error.message);
        }
    }


  return (
    <>
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content mt-3 mb-0">
                            <h1 className="">Edit your Goals</h1>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 mb-2">
                        <form action="" className="row" onSubmit={handleEdit}>
                            <div className="form-group">
                                <label htmlFor="goal" className="">Goal:</label>
                                <div className="d-flex">
                                    <input
                                        value={editGoal}
                                        onChange={(e) => setEditGoal(e.target.value)}
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
                </div>
            </div>
        </section>
    </>
  )
}

export default EditGoal