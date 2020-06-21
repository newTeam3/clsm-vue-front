import axios from "axios";
export const getMessageByUid = (params) => {
  return axios.post("/message/getMessageByUid",params).then(res=>res);
};
export const getMessageItem = (params) => {
  return axios.get("/message/getMessageItem",{params:params}).then(res=>res);

};
export const findEvaluateByMid = (params) => {
  return axios.get("/message/findEvaluateByMid", {
    params:params
  }).then(res=>res);
};
