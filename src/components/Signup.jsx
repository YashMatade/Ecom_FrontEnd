import React, { useState } from 'react';
import signup from "../utils/images/signup.png"
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/user';
import swal from 'sweetalert';

const Signup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const handleSignUp = (e) => {
        e.preventDefault();
        if (name === undefined || email === undefined || password === undefined) {
            swal("Warning", "All fields are required", "warning");
        } else {
            let data = { name, email, password }
            signUp(data).then((res) => {
                if (res.err === 200) {
                    swal("Success", res.msg, "success").then((ok) => {
                        if (ok) {
                            navigate("/")
                        }
                    })
                } else {
                    swal("Warning", res.msg, "warning")
                }
            })
        }
    }
    return (
        <div>
            <div className="container">
                <h3 className="text-center mt-5">User Sign Up</h3>
                <div className="row">
                    <div className="col-lg-3 mt-5">
                        <img src={signup} className='img-fluid animate__animated animate__backInLeft' alt="" />
                    </div>
                    <div className="col-lg-6 mt-5">
                        <div className="card shadow">
                            <form action="" className='p-3'>
                                <div className="mb-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mt-3">
                                    <button onClick={handleSignUp} className='btn btn-success w-100'>Sign Up</button>
                                </div>
                                <div className="mt-3">
                                    <b>Already Registered user? <span className='text-primary' style={{ cursor: "pointer" }} onClick={() => { navigate("/"); }}>Log in</span></b>
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

export default Signup;
