import axios from "axios";

const ROOT_URL = 'http://localhost:8080';

// 약관 조회
export const searchTerm = (param) => axios.get(`${ROOT_URL}/terms`, {
    params: {
        termName: param.termName
    }
});
// 약관 생성
export const createTerm = (param) => axios.post(`${ROOT_URL}/terms`, param);
// 약관 수정
export const updateTerm = (param) => axios.put(`${ROOT_URL}/terms/${param.id}`, param.data);

// 약관 상세 생성
export const createTermDetail = (param) => axios.post(`${ROOT_URL}/terms/${param.termId}/details`, param);
// 약관 조회
export const getTermDetailsByTermId = (param) => axios.get(`${ROOT_URL}/terms/${param.termId}/details`);