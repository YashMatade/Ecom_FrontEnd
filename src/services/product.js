const { axiosPrivate } = require("./axios");

export const listOfProducts = async (userId) => {
    const list = await axiosPrivate.post("/product/list", userId);
    return list.data;
};

export const addProduct = async (data) => {
    const list = await axiosPrivate.post("/product/add", data);
    return list.data;
};
