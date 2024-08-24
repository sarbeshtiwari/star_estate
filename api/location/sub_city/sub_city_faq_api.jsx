import axios from 'axios';

const API_BASE_URL = 'https://star-estate-api.onrender.com';

export const fetchFAQs = async (sub_city, content_type) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subCityFaqs/getSubCityFAQByCityAndType/${sub_city}/${content_type}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching FAQ: ' + error.message);
    }
};

export const updateFAQStatus = async (id, status) => {
    try {
        await axios.put(`${API_BASE_URL}/subCityFaqs/updateSubCityFaqStatus/${id}`, { status });
    } catch (error) {
        throw new Error('Error updating FAQ status: ' + error.message);
    }
};

export const deleteFAQ = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/subCityFaqs/deleteSubCityFAQ/${id}`);
    } catch (error) {
        throw new Error('Error deleting FAQ: ' + error.message);
    }
};


export const fetchFAQ = async (faqId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subCityFaqs/fetchSubCityFAQbyId/${faqId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        throw new Error('Error fetching FAQ: ' + error.message);
    }
};

export const updateFAQ = async (id, faqArray) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/subCityFaqs/updateSubCityFaq/${id}`, { faqArray });
        return response.data;
    } catch (error) {
        throw new Error('Error updating FAQ: ' + error.message);
    }
};

export const addFAQ = async (faqArray) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/subCityFaqs/addSubCityFaqByCity`, faqArray);
        return response.data;
    } catch (error) {
        throw new Error('Error adding FAQ: ' + error.message);
    }
};
