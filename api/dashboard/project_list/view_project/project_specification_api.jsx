import axios from 'axios';

const API_URL = 'https://star-estate-api.onrender.com/projectSpecifications';

// Fetch project specifications by project ID
export const fetchSpecificationsByProjectId = async (projectId) => {
    try {
        const response = await axios.get(`${API_URL}/getProjectSpecificationsByProjectName/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching specifications:', error);
        throw error;
    }
};

// Update specification status
export const updateSpecificationStatus = async (specId, status) => {
    try {
        const response = await axios.put(`${API_URL}/updateDetailStatus/${specId}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating specification status:', error);
        throw error;
    }
};

// Delete specification
export const deleteSpecification = async (specId) => {
    try {
        await axios.delete(`${API_URL}/deleteDetail/${specId}`);
    } catch (error) {
        console.error('Error deleting specification:', error);
        throw error;
    }
};

// Fetch detail by ID
export const fetchDetailById = async (detailId) => {
    try {
        const response = await axios.get(`${API_URL}/fetchDetailbyId/${detailId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Error fetching detail:', error);
        throw error;
    }
};

// Add new project specifications
export const addProjectSpecifications = async (specifications) => {
    try {
        const response = await axios.post(`${API_URL}/AddProjectSpecificationsByProjectName`, specifications);
        return response.data;
    } catch (error) {
        console.error('Error adding project specifications:', error);
        throw error;
    }
};

// Update existing project specifications
export const updateProjectSpecifications = async (projectId, specifications) => {
    try {
        const response = await axios.put(`${API_URL}/updateDetail/${projectId}`, { DetailArray: specifications });
        return response.data;
    } catch (error) {
        console.error('Error updating project specifications:', error);
        throw error;
    }
};
