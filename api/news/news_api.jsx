import axios from 'axios';

const API_URL = 'https://star-estate-api.onrender.com/news';

export const fetchNews = async () => {
    return axios.get(`${API_URL}/getNews`);
};

export const updateNewsStatus = async (id, status) => {
    return axios.put(`${API_URL}/updateNewsStatus/${id}`, { status });
};

export const deleteNews = async (id, image, image2) => {
    return axios.delete(`${API_URL}/deleteNews/${id}`, { data: { image, image2 } });
};



export const fetchNewsById = async (id) => {
    return axios.get(`${API_URL}/getNewsById/${id}`);
};

export const addNews = async (data) => {
    return axios.post(`${API_URL}/addNews`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateNews = async (id, data) => {
    return axios.put(`${API_URL}/updateNews/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
