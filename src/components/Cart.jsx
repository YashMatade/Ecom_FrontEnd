import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { cartAddAnother, cartItemsList, cartRemoveAnother, removeFromCart } from '../services/cart';

const Cart = () => {
    const [count, setCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState();
    const [itemQuantities, setItemQuantities] = useState({});
    const userId = localStorage.getItem("userId")
    function list() {
        cartItemsList({ userId }).then((data) => {
            setCount(data?.listOfCartProducts?.length);
            setCartItems(data?.listOfCartProducts);
            setCart(data)
            if (data.err === 200) {
                const initialQuantities = {};
                data?.listOfCartProducts.forEach((item) => {
                    initialQuantities[item.productId._id] = item.quantity;
                });
                setItemQuantities(initialQuantities);
            }
        });
    }

    useEffect(() => {
        list();
    }, []);

    const handleAddAnother = (productId) => {
        cartAddAnother({ userId, productId }).then((res) => {
            setItemQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: res.cartItem.quantity,
            }));
        });

        list();
    };

    const handleRemoveAnother = (productId) => {
        cartRemoveAnother({ userId, productId }).then((res) => {
            setItemQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: res.cartItem.quantity,
            }));
        });
        list();
    };

    const removeItem = (productId) => {
        removeFromCart({ userId, productId }).then((res) => {
            list();
        })
    }

    return (
        <div>
            <Navbar count={count} />

            <div className="container-fluid ">
                <div className="row mt-5">
                    <h1 className='text-center mb-4'>Cart</h1>
                    {
                        cart?.err === 200 ? (<>

                            <div className="col-lg-8 ">
                                <table className='table table-secondary border border-dark'>
                                    <thead>
                                        <tr className='table-success'>
                                            <th>Item</th>
                                            <th>Image</th>
                                            <th>Each Price</th>
                                            <th>Quantity</th>
                                            <th>Offer Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems?.map((data) => (
                                            <tr key={data.productId._id} className='table-success'>
                                                <td>{data.productId.title}</td>
                                                <td>
                                                    <img
                                                        src={data.productId.image}
                                                        style={{ width: "70px", height: "70px" }}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>
                                                    {data?.productId?.offerPrice}
                                                </td>
                                                <td>
                                                    <button className='btn btn-primary me-2' onClick={() => handleRemoveAnother(data.productId._id)}  >-</button>
                                                    <b>{itemQuantities[data.productId._id]}</b>
                                                    <button className='btn btn-primary ms-2' onClick={() => handleAddAnother(data.productId._id)}>+</button>
                                                    <button className='btn btn-danger ms-2' onClick={() => removeItem(data.productId._id)}>delete</button>
                                                </td>
                                                <td>
                                                    {data?.modifiedPrice}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-4">
                                <div className="row align-items-center border border-dark p-3">
                                    <div className="col-lg-6 text-start">
                                        Total Price -
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        {cart?.totalPrice}
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        GST -
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        {cart?.gstPercentage}
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        GST Amount -
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        {cart?.gstAmount}
                                    </div>
                                    <div className="col-lg-6 text-start">
                                        <b>Total With GST -</b>
                                    </div>
                                    <div className="col-lg-6 text-end">
                                        <b>{cart?.totalWithGST}</b>
                                    </div>
                                    <button className='btn btn-success w-100 mt-2'>Checkout</button>
                                </div>
                            </div>
                        </>) : (<>
                            <div className="container">
                                <div className='border border-dark p-5'>
                                    <h1 className='text-center'>Cart is Empty, Continue shopping...</h1>
                                </div>
                            </div>

                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;