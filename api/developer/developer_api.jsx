import axios from 'axios';

const API_URL = 'https://star-estate-api.onrender.com';

// Fetch all developers
export const fetchDevelopers = async () => {
    try {
        const response = await axios.get(`${API_URL}/developers/getDeveloper`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch developers');
    }
};

// Update developer status
export const updateDeveloperStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/developers/updateDeveloperStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update developer status');
    }
};

// Delete a developer
export const deleteDeveloper = async (id, image) => {
    try {
        await axios.delete(`${API_URL}/developers/deleteDeveloper/${id}`, { data: { image } });
    } catch (error) {
        throw new Error('Failed to delete developer');
    }
};

// Fetch developer by ID
export const fetchDeveloperById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/developers/getDeveloperById/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch developer data');
    }
};

// Add a new developer
export const addDeveloper = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/developers/addDeveloper`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add developer');
    }
};

// Update an existing developer
export const updateDeveloper = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/developers/updateDeveloper/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update developer');
    }
};
