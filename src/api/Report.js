import axios from "axios";

export const getTask = (params) => {
  return axios.post("/task/findAllTask",params).then(res=>res);

};
export const checkTask = (params) => {
  return axios.get("/task/checkTask",{params:params}).then(res=>res);

};
export const commit = (params) => {
  return axios.post("/message/commit",params).then(res=>res);

};
