import axios from 'axios';

// Base URL for the API
const API_URL = 'https://star-estate-api.onrender.com/projectFaq';

// Fetch FAQs by project ID
export const fetchFAQs = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}/getFAQByProject/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        throw error;
    }
};

// Update FAQ status
export const updateFAQStatus = async (faqId, status) => {
    try {
        await axios.put(`${API_URL}/updateFaqStatus/${faqId}`, { status });
    } catch (error) {
        console.error('Error updating FAQ status:', error);
        throw error;
    }
};

// Delete FAQ
export const deleteFAQ = async (faqId) => {
    try {
        await axios.delete(`${API_URL}/deleteFAQ/${faqId}`);
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        throw error;
    }
};


// Fetch FAQ by ID
export const fetchFAQById = async (faqId) => {
    try {
        const response = await axios.get(`${API_URL}/fetchFAQbyId/${faqId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching FAQ by ID:', error);
        throw error;
    }
};

// Update existing FAQs
export const updateFAQ = async (projectId, faqArray) => {
    try {
        const response = await axios.put(`${API_URL}/updateFaq/${projectId}`, { faqArray });
        return response.data;
    } catch (error) {
        console.error('Error updating FAQ:', error);
        throw error;
    }
};

// Add new FAQs
export const addFAQs = async (faqArray) => {
    try {
        const response = await axios.post(`${API_URL}/AddFaqByProject`, faqArray);
        return response.data;
    } catch (error) {
        console.error('Error adding FAQs:', error);
        throw error;
    }
};
