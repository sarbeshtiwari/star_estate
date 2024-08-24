import axios from 'axios';

const BASE_URL = 'https://star-estate-api.onrender.com';

export const addLocationAdvantages = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/locationAdvantages/addLocationAdvantages`, formData, {
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

export const getLocationAdvantages = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/locationAdvantages/getLocationAdvantages`);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const getLocationAdvantagesByID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/locationAdvantages/getLocationAdvantagesByID/${id}`);
        console.log(response.data);
        return response.data;

    }catch (error){
        console.error('Error', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const updateLocationAdvantages = async (id, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/locationAdvantages/updateLocationAdvantages/${id}`, formData, {
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

export const updateLocationAdvantagesStatus = async (cat_id, status) => {
    try {
        await axios.put(`${BASE_URL}/locationAdvantages/updateLocationAdvantagesStatus/${cat_id}`, { status });
    } catch (error) {
        throw new Error('Error updating Location Advantages status.');
    }
};

// Delete LocationAdvantages
export const deleteLocationAdvantages = async (cat_id) => {
    try {
        await axios.delete(`${BASE_URL}/locationAdvantages/deleteLocationAdvantages/${cat_id}`);
    } catch (error) {
        throw new Error('Error deleting Location Advantages.');
    }
};