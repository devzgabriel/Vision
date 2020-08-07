import axios from 'axios'
const eye = axios.create({
  baseURL: 'http://localhost:3333'  //change this URL for eye service
})

export default eye
