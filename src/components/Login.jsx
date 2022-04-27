import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios"
import useAuth from '../hooks/useAuth'


const Login = () => {

    // destructure setAuth from our Context
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    // this gets where the user came from 
    const from = location?.state?.from?.pathname || "/";

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const LOGIN_URL = "/login"

    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    // clear error message when user or password field changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            const accessToken = data?.accessToken;
            const roles = data?.roles;
            // save response into global auth state
            setAuth({user, pwd, roles, accessToken})
            console.log(data)
            setUser("");
            setPwd("");
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            // set focus on the error for screen reader accessibility
            errRef.current.focus();
        }
    }




  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro">
                    <h3>Login</h3>
                    <p className="lead mt-3">Please Login to access the Application</p>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-lg-7">
                    {/* screen reader accessibility */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{ errMsg }</p>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="username">Username:</label>
                            <input
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                ref={userRef}
                                type="text"
                                autoComplete="off"
                                id="username"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="password">Password:</label>
                            <input
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                type="password"
                                placeholder=''
                                id="password"
                                className="form-control"
                            />
                        </div>
                        
                        <div>
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>



            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex justify-content-center align-items-center text-center lead">
                        <small className="me-4">Don't have an account ?</small>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login