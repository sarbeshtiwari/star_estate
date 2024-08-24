import axios from 'axios';

const baseURL = 'https://star-estate-api.onrender.com/quickDetails';

export const fetchDetails = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/getQuickDetailsByProjectName/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch details: ' + error.message);
    }
};

export const updateStatus = async (id, status) => {
    try {
        const response = await axios.put(`${baseURL}/updateDetailStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update status: ' + error.message);
    }
};

export const deleteDetails = async (id) => {
    try {
        await axios.delete(`${baseURL}/deleteDetail/${id}`);
    } catch (error) {
        throw new Error('Failed to delete details: ' + error.message);
    }
};


export const fetchDetail = async (detailId) => {
    try {
        const response = await axios.get(`${baseURL}/fetchDetailbyId/${detailId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        throw new Error('Failed to fetch detail: ' + error.message);
    }
};

export const addQuickDetails = async (details) => {
    try {
        const response = await axios.post(`${baseURL}/AddQuickDetailsByProjectName`, details);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add quick details: ' + error.message);
    }
};

export const updateQuickDetails = async (id, details) => {
    try {
        const response = await axios.put(`${baseURL}/updateDetail/${id}`, { DetailArray: details });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update quick details: ' + error.message);
    }
};
