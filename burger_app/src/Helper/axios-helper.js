import React from "react"
import axios from "axios"

const axiosInstance = 
    axios.create({
        baseURL: "https://react-burger-app-8842e.firebaseio.com/"
    })

export default axiosInstance