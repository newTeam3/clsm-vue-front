import axios from "axios";


export const findUserByID = (params) => {
  return axios.get("/user/findUserByID",{params:params}).then(res=>res);
};
export const login = (params) => {
  return axios.post("/auth",params).then(res=>res);
};

export const getUser = () => {
  return axios.get("/user").then(res=>res);

};
export const getSearchData = () => {

  return axios.get("/user/getSearchData").then(res=>res);
};
export const updateUser = (params) => {
  return axios.post("/user/changeUserData",params).then(res=>res);
};
export const checkPhone = (params) => {
  return axios.get("/user/checkPhone",{
    params:params
  }).then(res=>res);
};
export const checkCode = (params) => {
  return axios.get("/sms/checkCode",{
    params:params
  }).then(res=>res);
};
export const send = (params) => {
  return axios.get("/sms/send",{
    params:params
  }).then(res=>res);
};
export const changePwd = (params) => {
  return axios.post("/user/changePwd",params).then(res=>res);
};
export const getTotalData = (params) => {
  return axios.get("/user/getTotalData",{
    params:params
  }).then(res=>res);
};
