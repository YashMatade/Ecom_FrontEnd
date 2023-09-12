import React, { useState } from 'react'
import Navbar from './Navbar';
import swal from 'sweetalert';
import { addProduct } from '../services/product';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [productName, setProductName] = useState();
    const [productDesc, setProductDesc] = useState();
    const [productActualPrice, setProductActualPrice] = useState();
    const [productOfferPrice, setProductOfferPrice] = useState();
    const [imageLink, setImageLink] = useState();

    const navigate = useNavigate();

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (productName === undefined || productDesc === undefined || productActualPrice === undefined || productOfferPrice == undefined || imageLink === undefined) {
            swal("Warning", "All fields Mandetory")
        } else {
            let data = { title: productName, description: productDesc, actualPrice: productActualPrice, offerPrice: productOfferPrice, image: imageLink }
            addProduct(data).then((res) => {
                if (res.err === 200) {
                    swal("Success", res.msg, "success").then((ok) => {
                        if (ok) {
                            navigate("/dash")
                        }
                    })
                } else {

                }
            })
        }

    }
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <h1 className='text-center'>Add Product</h1>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <form action="" className='card shadow p-3'>
                            <div className='mt-3'>
                                <label htmlFor="">Product Name</label>
                                <input type="text" className='form-control' onChange={(e) => { setProductName(e.target.value) }} />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Product Description</label>
                                <input type="text" className='form-control' onChange={(e) => { setProductDesc(e.target.value) }} />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Product Actual Price</label>
                                <input type="number" className='form-control' onChange={(e) => { setProductActualPrice(e.target.value) }} />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Product Offer Price</label>
                                <input type="number" className='form-control' onChange={(e) => { setProductOfferPrice(e.target.value) }} />
                            </div>
                            <div className='mt-3'>
                                <label htmlFor="">Product Image link</label>
                                <input type="text" className='form-control' onChange={(e) => { setImageLink(e.target.value) }} />
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-success w-100' onClick={handleAddProduct}>Add Product</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
