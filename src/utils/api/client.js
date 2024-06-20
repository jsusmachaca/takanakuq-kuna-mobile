import axios from "axios"

const API_URL = process.env.API_URL
baseAPIUrl = 'http://161.132.47.170'

export const apiClient = axios.create({
  baseURL: baseAPIUrl
})
