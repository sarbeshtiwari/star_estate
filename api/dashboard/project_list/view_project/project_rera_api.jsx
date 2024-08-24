import axios from 'axios';

const BASE_URL = 'https://star-estate-api.onrender.com/projectRera';

export const addProjectRera = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/addProjectRera`, formData, {
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

export const getProjectReraByProject = async (project) => {
    try {
        const response = await axios.get(`${BASE_URL}/getProjectRera/${project}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const getProjectReraByID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getProjectReraByID/${id}`);
        console.log(response.data);
        return response.data;

    }catch (error){
        console.error('Error', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const updateProjectRera = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateProjectRera/${id}`, formData, {
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

export const updateProjectReraStatus = async (cat_id, status) => {
    try {
        await axios.put(`${BASE_URL}/updateProjectReraStatus/${cat_id}`, { status });
    } catch (error) {
        throw new Error('Error updating Location Advantages status.');
    }
};

// Delete ProjectRera
export const deleteProjectRera = async (cat_id) => {
    try {
        await axios.delete(`${BASE_URL}/deleteProjectRera/${cat_id}`);
    } catch (error) {
        throw new Error('Error deleting Location Advantages.');
    }
};