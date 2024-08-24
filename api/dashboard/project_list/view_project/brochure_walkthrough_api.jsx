import axios from 'axios';

const API_URL = `https://star-estate-api.onrender.com/projectBrochureWalkthrough`;

export const addBrochure = async (projectname, formData) => {
    try {
        const response = await axios.post(`${API_URL}/addBrochure_Walkthrough/${projectname}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding brochure:", error);
        throw new Error('Failed to fetch details: ' + error.message);
    }
};

export const getBrochure = async (projectname) => {
    try {
        const response = await axios.get(`${API_URL}/getBrochure_Walkthrough/${projectname}`);
        
        return response.data;
    } catch (error) {
        console.error("Error adding brochure:", error);
        throw new Error('Failed to fetch details: ' + error.message);
    }
}

export const updateStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_URL}/updateBrochure_WalkthroughStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update status: ' + error.message);
    }
};

export const deleteDetails = async (id) => {
    try {
        await axios.delete(`${API_URL}/deleteBrochure_Walkthrough/${id}`);
    } catch (error) {
        throw new Error('Failed to delete details: ' + error.message);
    }
};

export const getBrochureByID = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/fetchBrochure_WalkthroughbyId/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error adding brochure:", error);
        throw new Error('Failed to fetch details: ' + error.message);
    }
}

export const updateBrochure = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/updateBrochure_Walkthrough/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding brochure:", error);
        throw new Error('Failed to fetch details: ' + error.message);
    }
};