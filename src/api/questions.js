import axios from "axios";

export const findAllQuestion = (params) => {
  return axios.post("/question/findAll",params).then(res=>res);
};
export const findQuestionById = (params) => {
  return axios.get("/question/findQuestionById",{params:params}).then(res=>res);
};
export const reply = (params) => {
  return axios.post("/question/reply",params).then(res=>res);
};
export const addQuestion = (params) => {
  return axios.post("/question/addQuestion",params).then(res=>res);
};
export const banQuestion = (params) => {
  return axios.post("/question/banQuestion",params).then(res=>res);
};
