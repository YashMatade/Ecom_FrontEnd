const { axiosPrivate } = require("./axios");

export const signUp = async (data) => {
    const res = await axiosPrivate.post("/user/signup", data);
    return res.data;
}

export const logIn = async (data) => {
    const res = await axiosPrivate.post("/user/login", data);
    return res.data;
}