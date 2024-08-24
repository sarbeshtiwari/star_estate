import axios from 'axios';

const BASE_URL = 'https://star-estate-api.onrender.com/projectGallery';

export const addProjectGallery = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addProjectGallery`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
};

export const getProjectGalleryByProject = async (project) => {
    try {
        const response = await axios.get(`${BASE_URL}/getProjectGallery/${project}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const getProjectGalleryByID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getProjectGalleryByID/${id}`);
        console.log(response.data);
        return response.data;

    }catch (error){
        console.error('Error', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const updateProjectGallery = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateProjectGallery/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
};

export const updateProjectGalleryStatus = async (cat_id, status) => {
    try {
        await axios.put(`${BASE_URL}/updateProjectGalleryStatus/${cat_id}`, { status });
    } catch (error) {
        throw new Error('Error updating Location Advantages status.');
    }
};

export const updateProjectGalleryHomeStatus = async (cat_id, displayHome) => {
    try {
        await axios.put(`${BASE_URL}/updateProjectGalleryHomeStatus/${cat_id}`, { displayHome });
    } catch (error) {
        throw new Error('Error updating Location Advantages status.');
    }
};

// Delete ProjectGallery
export const deleteProjectGallery = async (cat_id) => {
    try {
        await axios.delete(`${BASE_URL}/deleteProjectGallery/${cat_id}`);
    } catch (error) {
        throw new Error('Error deleting Location Advantages.');
    }
};