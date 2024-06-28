import axios from "axios"

const API_URL = process.env.API_URL
baseAPIUrl = 'https://takanakuqkuna.com'

export const apiClient = axios.create({
  baseURL: baseAPIUrl
})
