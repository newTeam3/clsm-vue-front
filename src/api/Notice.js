import axios from "axios";

export const getAllNotice = (params) => {
  return axios.post("/task/findAll",params).then(res=>res);

};

