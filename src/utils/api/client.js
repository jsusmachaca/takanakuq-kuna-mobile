import axios from "axios"

const API_URL = process.env.API_URL
baseAPIUrl = `http://${API_URL || '161.132.47.170' }`
console.log(baseAPIUrl)

export const apiClient = axios.create({
  baseURL: baseAPIUrl
})
