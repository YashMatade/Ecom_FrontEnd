import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    const { count } = props;
    const userName = localStorage.getItem("userName");

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" onClick={() => navigate("/dash")} style={{ cursor: "pointer" }}>Welcome {userName}</a>
                    <form class="d-flex">
                        <button type="button" class="btn btn-primary position-relative" onClick={() => navigate("/cart")}>
                            Cart
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {count || 0}
                                <span class="visually-hidden"></span>
                            </span>
                        </button>
                        <button className='btn btn-secondary ms-4' onClick={() => navigate("/addproduct")}>Add Product</button>
                        <button className='btn btn-danger ms-4' onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;