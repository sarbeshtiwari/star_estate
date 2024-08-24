import axios from 'axios';

const API_BASE_URL = `https://star-estate-api.onrender.com`;
// const API_BASE_URL = 'http://localhost:1000';

// Add categories
export const addCategories = async (dataToSubmit) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories/addCategory`, dataToSubmit);   //can change later
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Update categories
export const updateCategories = async (id, dataToSubmit) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories/updateCategory/${id}`, dataToSubmit);   //can change later
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error Updating categories:', error);
        throw error;
    }
};

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/getCategories`);   //can change later

        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Update category status
export const updateCategoryStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/categories/updateCategoryStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating category status:', error);
        throw error;
    }
};

// Delete category
export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/categories/deleteCategory/${id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

// Get category by ID
export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/getCategoriesByID/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
};
