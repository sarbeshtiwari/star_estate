import axios from 'axios';

const API_URL = 'https://star-estate-api.onrender.com/city';

// Fetch all cities
export const fetchCities = async () => {
    try {
        const response = await axios.get(`${API_URL}/getCities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

// Update city status
export const updateCityStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/updateCityStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating city status:', error);
        throw error;
    }
};

// Delete a city
export const deleteCity = async (id) => {
    try {
        await axios.delete(`${API_URL}/deleteCity/${id}`);
    } catch (error) {
        console.error('Error deleting city:', error);
        throw error;
    }
};


export const fetchCityDetails = async (ids, id) => {
    try {
        const response = await axios.get(`${API_URL}/getCityByCityAndProjectType/${ids}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching city details: ' + error.message);
    }
};

export const addCity = async (formDataToSend) => {
    try {
        const response = await axios.post(`${API_URL}/addCity`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding city: ' + error.message);
    }
};

export const updateCity = async (cityId, id, formDataToSend) => {
    try {
        const response = await axios.put(`${API_URL}/updateCity/${cityId}/${id}`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error updating city: ' + error.message);
    }
};
