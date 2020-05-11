// const API = process.env.NODE_ENV=="development"?'/api/v1':'http://webapi.bk.apal.com.cn/api/v1.0'
const API = `/api/v1`
// const API = '' //私有化专用
const api = {
}

export const getapi = name => api[name]?api[name]:null