import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { listOfProducts } from '../services/product';
import { addTocart, cartItemsList } from '../services/cart';
import swal from 'sweetalert';

const Dashboard = () => {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState();
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        listOfProducts({ userId: userId }).then((data) => {
            setProducts(data.data);
        });
        cartItemsList({ userId: userId }).then((data) => {
            if (data?.listOfCartProducts?.length === 0) {
                setCount(0)
            } else {
                setCount(data?.listOfCartProducts?.length)
            }
        })
    }, []);
    const handleCart = (productId) => {
        let data = {
            userId,
            productId
        }
        addTocart(data).then((res) => {
            if (res.err === 200) {
                swal("Success", res.msg, "success")
                listOfProducts({ userId }).then((data) => {
                    setProducts(data.data);
                })
                cartItemsList({ userId }).then((data) => {
                    setCount(data?.listOfCartProducts?.length)
                })
            } else {
                swal("Warning", res.msg, "warning")
            }
        })
    }
    return (
        <div>
            <Navbar count={count} />
            <h1 className='text-center mt-3 mb-3'>Dashboard</h1>
            {
                products ? (
                    <>
                        <div className="container">
                            <div className="row">
                                {
                                    products?.map((pr, key) => {
                                        return <div key={key} className="col-lg-3" >
                                            <div class="card">
                                                <img src={pr.image} alt="" style={{ height: "200px" }} />
                                                <div class="card-body">
                                                    <h5 class="card-title">{pr.title}</h5>
                                                    <p class="card-text">{pr.description}</p>
                                                </div>
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item justify-content-between d-flex"><span>Actual Price :</span> <b>{pr.actualPrice}</b></li>
                                                    <li class="list-group-item justify-content-between d-flex"> <span>
                                                        Offer Price :
                                                    </span>
                                                        <b>{pr.offerPrice}</b> </li>
                                                </ul>
                                                <div class="card-body">
                                                    <button className='btn btn-primary w-100' onClick={() => { handleCart(pr._id); }}>{pr.buttonText}</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='text-center'>
                            <h1 className='mt-5'> Loding...</h1>
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Dashboard;
