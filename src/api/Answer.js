import axios from "axios";


export const findAllPaper = (params,param) => {

  return axios.get("/paper/findAllPaper?page="+params+"&size="+param).then(res=>res);

};
export const findAllAnswer = (params,param) => {
  return axios.get("/answer/AnswerAll?paperNum="+params+"&bankId="+param).then(res=>res);

};
export const findOne = (params) => {

  return axios.get("/paper/findOne?id="+params).then(res=>res);

};
export const save = (params) => {

  return axios.post("/exam/save",params).then(res=>res);

};
export const findAllExam = (params,param3,param,param2) => {

  return axios.get("/exam/findAllExam?page="+params+"&rows="+param3+"&username="+param+"&name="+param2).then(res=>res);

};
export const save1 = (params,param1,param) => {

  return axios.post("/answer/save1?uid="+params+"&paperId="+param1,param).then(res=>res);

};
export const findAll = (params,param) => {
  return axios.get("/answer/findAll?uid="+params+"&paperId="+param).then(res=>res);

};
export const findExamSource = (params,param) => {
  return axios.get("/exam/findExamSource?uid="+params+"&paperId="+param).then(res=>res);

};
