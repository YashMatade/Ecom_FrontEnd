import React, { useState } from 'react';
import login from "../utils/images/Login.png"
import { useNavigate } from 'react-router-dom';
import { logIn } from '../services/user';
import swal from 'sweetalert';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const handleLogIn = (e) => {
        e.preventDefault();
        if (email === undefined || password === undefined) {
            swal("Warning", "All fields are required", "warning")
        }
        let data = { email, password }
        logIn(data).then((res) => {
            if (res.err === 200) {
                localStorage.setItem("userId", res.data._id);
                localStorage.setItem("userName", res.data.name);
                swal("Success", res.msg, "success").then((ok) => {
                    if (ok) {
                        navigate("/dash")
                    }
                })
            } else {
                swal("Warning", res.msg, "warning")
            }
        })
    }
    return (
        <div>
            <div className="container">
                <h3 className="text-center mt-5">User Log In</h3>
                <div className="row">
                    <div className="col-lg-3 mt-5">
                        <img src={login} className='img-fluid animate__animated animate__backInLeft' alt="" />
                    </div>
                    <div className="col-lg-6 mt-5">
                        <div className="card shadow">
                            <form action="" className='p-3'>

                                <div className="mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mt-3">
                                    <button onClick={handleLogIn} className='btn btn-success w-100'>Log in</button>
                                </div>
                                <div className="mt-3">
                                    <b>New user? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Sign up</span></b>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Login;
