
import axios from "axios";

const API_BASE_URL = 'http://localhost:3002';

// Fetch active categories
export const fetchActiveCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getTrueCategories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};
