// src/services/apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://star-estate-api.onrender.com/amenities';

export const getAmenitiesCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAmenitiyCategories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};

export const getAmenitiesCategoriesByid = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAmenitiyCategoriesByID/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};

export const updateCategoryStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateAmenitiyCategoryStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Error updating category status');
    }
};

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteAmenitiyCategory/${id}`);
    } catch (error) {
        throw new Error('Error deleting category');
    }
};

export const addAmenitiesCategory = async (category) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addAmenitiyCategory`, {category});   
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const updateAmenitiesCategory = async (id, category) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/updateAmenitiyCategory/${id}`, {category});   
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};