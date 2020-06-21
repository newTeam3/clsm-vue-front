import axios from "axios";
export const findAllArticle = (params) => {
  return axios.post("/article/findAllArticle",params).then(res=>res);
};
export const getSort = () => {
  return axios.get("/article/getSort").then(res=>res);
};
export const banArticle = (params) => {
  return axios.post("/article/banArticle",params).then(res=>res);
};
export const addArticle = (params) => {
  return axios.post("/article/addArticle",params).then(res=>res);
};
export const getArticle = (params) => {
  return axios.get("/article/getArticle",{
    params:params
  }).then(res=>res);
};
export const getComments = (params) => {
  return axios.get("/article/getComments",{
    params:params
  }).then(res=>res);
};
export const addComments = (params) => {
  return axios.post("/article/addComments",params).then(res=>res);
};
export const addReply = (params) => {
  return axios.post("/article/addReply",params).then(res=>res);
};
