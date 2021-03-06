import React, { useRef, useEffect, useState } from 'react'
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth';

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {

    // destructure setAuth from our Context
    const { setAuth } = useAuth();

    // role state
    const [role, setRole] = useState("");


    // set focus on username input field and error message
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate()
    const location = useLocation();

    // this gets where the user came from 
    const from = location?.state?.from?.pathname || "/";

    // username state
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    // password state
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    // confirm password state
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    // error message state
    const [errMsg, setErrMsg] = useState(false)

    // when component mounts, set focus on username input fields
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // check if username conforms to the RegEx
    useEffect(() => {
        const result = USER_REGEX.test(user); // return true or false
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    // check if both password matches
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(pwd);
        console.log(result);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    // clear out the error message when dependency array changes
    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])

    const checkRoles = (role) => {
        let newRole
        switch(role){
            case "Editor":
                newRole = {
                    "Editor": 1984
                }
                break;
            case "Admin":
                newRole = {
                    "Admin": 5150
                }
                break;
            case "Both":
                newRole = {
                    "Admin": 5150,
                    "Editor": 1984
                }
                break;
            default: 
                return ""
        }
        return newRole;
    }


    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS Hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        console.log(user, pwd);
        try {
            const { data } = await axios.post(REGISTER_URL, { user, pwd, "roles": checkRoles(role) }, {
                withCredentials: true
            })

            const accessToken = data.accessToken;
            const userRoles = data.roles;
            // save response into global auth state
            setAuth({ user, pwd, "roles": userRoles, accessToken });
            console.log(data)
            // clear Input fields
            setUser("");
            setPwd("");
            setMatchPwd(""); 
            
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration failed")
            }
            // set focus on error message
            errRef.current.focus()
        }
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 intro">
                            <h3>Register</h3>
                            <p className="lead mt-3">Please Register to access the Application</p>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-7">
                            <p ref={errRef} aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="form-group col-12">
                                    <label htmlFor="username">Username:
                                        <span className={validName ? "valid" : "hide"}><FaCheck /></span>
                                        <span className={validName || !user ? "hide" : "invalid"}><FaTimes /></span>
                                    </label>
                                    <input
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        ref={userRef}
                                        type="text"
                                        autoComplete="off"
                                        id="username"
                                        className="form-control"
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true) }
                                        onBlur={() => setUserFocus(false) }
                                    />
                                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                        <FaInfoCircle />
                                        4 to 24 characters. <br />
                                        Must begin with a letter. <br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </div>


                                <div className="form-group col-12">
                                    <label htmlFor="password">Password:
                                        <span className={validPwd ? "valid" : "hide"}><FaCheck /></span>
                                        <span className={validPwd || !pwd ? "hide" : "invalid"}><FaTimes /></span>
                                    </label>
                                    <input
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        type="password"
                                        placeholder=''
                                        id="password"
                                        className="form-control"
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FaInfoCircle />
                                        8 to 24 characters. <br />
                                        Must include uppercase and lowercase letters, a number and a special character. <br />
                                        Allowed  special characters: <span aria-label='exclamation mark'>!</span> <span aria-label="at symbol">@</span> <span aria-label='dollar sign'>$</span> <span aria-label='hashtag'>#</span> <span aria-label='percent'>%</span>
                                    </p>
                                </div>


                                <div className="form-group col-12">
                                    <label htmlFor="confirm_pwd">Confirm Password:
                                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                            <FaCheck />
                                        </span>
                                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                            <FaTimes />
                                        </span>
                                    </label>
                                    <input
                                        value={matchPwd}
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        type="password"
                                        id="confirm_pwd"
                                        placeholder=''
                                        className="form-control"
                                        autoComplete='off'
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        <FaInfoCircle />
                                        Must match the first password input field.
                                    </p>
                                </div>
                                <div className="form-group col-12">
                                    <select name="roles" id="" onChange={(e) => setRole(e.target.value)}>
                                        <option>Choose a Role</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>
                                <div>
                                    <button disabled={!validName || !validPwd || !validMatch || !role ? true : false} className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-12 intro">
                            <div className="d-sm-flex justify-content-center align-items-center text-center lead">
                                <small className="me-4">Already have an account ?</small>
                                <Link to="/login" className="btn btn-primary">Log In</Link>
                            </div>
                        </div>
                    </div>


                </div>
            </section>                    
        </>
    )
}



export default Register