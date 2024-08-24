import axios from 'axios';

const baseURL = 'https://star-estate-api.onrender.com/projectContentSEO';

export const fetchDetails = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/getContentSEO/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch details: ' + error.message);
    }
};

export const updateStatus = async (id, status) => {
    try {
        const response = await axios.put(`${baseURL}/updateContentSEOStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update status: ' + error.message);
    }
};

export const deleteDetails = async (id) => {
    try {
        await axios.delete(`${baseURL}/deleteContentSEO/${id}`);
    } catch (error) {
        throw new Error('Failed to delete details: ' + error.message);
    }
};


export const fetchContent = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/getContentSEO/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch content: ' + error.message);
    }
};

export const saveContentSEO = async (id, data) => {
    try {
        if (id === 'add') {
            return await axios.post(`${baseURL}/addContentSEO`, data);
        } else {
            return await axios.put(`${baseURL}/updateContentSEO/${id}`, data);
        }
    } catch (error) {
        throw new Error('Failed to save content: ' + error.message);
    }
};
