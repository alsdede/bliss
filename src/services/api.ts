import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://private-anon-8b2513d1a4-blissrecruitmentapi.apiary-mock.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
