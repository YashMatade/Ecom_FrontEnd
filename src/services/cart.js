const { axiosPrivate } = require("./axios");

export const addTocart = async (data) => {
    const res = await axiosPrivate.post("/cart/add", data);
    return res.data;
}

export const removeFromCart = async (data) => {
    const res = await axiosPrivate.post("/cart/remove", data);
    return res.data;
}

export const cartItemsList = async (data) => {
    const res = await axiosPrivate.post("/cart/list", data);
    return res.data;
}

export const cartAddAnother = async (data) => {
    const res = await axiosPrivate.post("/cart/addanother", data);
    return res.data;
}

export const cartRemoveAnother = async (data) => {
    const res = await axiosPrivate.post("/cart/removeanother", data);
    return res.data;
}