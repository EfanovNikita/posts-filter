import axios from "axios";

export const fetchNewsInstance = axios.create({
    baseURL: 'https://dev.retnback.only.com.ru/api/news/list'
})

