import axios from 'axios';

const API_BASE_URL = 'https://star-estate-api.onrender.com/subCity';

export const fetchSubCities = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSubCityByCity/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching subCities: ' + error.message);
    }
};

export const updateSubCityStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateSubCityStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Error updating subCity status: ' + error.message);
    }
};

export const deleteSubCity = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteSubCity/${id}`);
    } catch (error) {
        throw new Error('Error deleting subCity: ' + error.message);
    }
};


export const fetchCityDetails = async (id, ids) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getSubCityByID/${id}/${ids}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching city details: ' + error.message);
    }
};

export const addSubCity = async (formDataToSend) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addSubCity`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding subCity: ' + error.message);
    }
};

export const updateSubCity = async (id, ids, formDataToSend) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateSubCity/${id}/${ids}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating subCity: ' + error.message);
    }
};
