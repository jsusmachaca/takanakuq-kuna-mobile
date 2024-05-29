import axios from "axios"

const API_URL = process.env.API_URL
baseAPIUrl = `http://${API_URL}`
console.log(baseAPIUrl)
export const apiClient = axios.create({
  baseURL: baseAPIUrl
})
