import axios from 'axios';

const API_BASE_URL = 'https://star-estate-api.onrender.com';

export const fetchFAQs = async (city, projectType) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/faqs/getFAQByCityAndType/${city}/${projectType}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching FAQs: ' + error.message);
    }
};

export const updateFAQStatus = async (id, status) => {
    try {
        await axios.put(`${API_BASE_URL}/faqs/updateFaqStatus/${id}`, { status });
    } catch (error) {
        throw new Error('Error updating FAQ status: ' + error.message);
    }
};

export const deleteFAQ = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/faqs/deleteFAQ/${id}`);
    } catch (error) {
        throw new Error('Error deleting FAQ: ' + error.message);
    }
};


export const fetchFAQ = async (faqId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/faqs/fetchFAQbyId/${faqId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        throw new Error('Error fetching FAQ: ' + error.message);
    }
};

export const updateFAQ = async (id, faqArray) => {
    try {
        return await axios.put(`${API_BASE_URL}/faqs/updateFaq/${id}`, { faqArray });
    } catch (error) {
        throw new Error('Error updating FAQ: ' + error.message);
    }
};

export const addFAQ = async (faqArray) => {
    try {
        return await axios.post(`${API_BASE_URL}/faqs/addFaqByCity`, faqArray);
    } catch (error) {
        throw new Error('Error adding FAQ: ' + error.message);
    }
};
