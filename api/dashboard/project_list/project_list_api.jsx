import axios from "axios";

const API_BASE_URL = 'https://star-estate-api.onrender.com/addProjects';

export const fetchProjects = async (id) => {
    try {
        
        const response = await axios.get(`${API_BASE_URL}/getProjectByType/${id}`);
        return response.data;
       
    } catch (err) {
        setError('Failed to fetch data');
     
    }
};

export const updateStatus = async (id, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateProjectStatus/${id}`, { status });
        return response; // Ensure response is returned
    } catch (error) {
        console.error('Unexpected error:', error);
        throw error; // Rethrow the error to be handled in the caller function
    }
};

export const updateProjectStatusCategory = async (id, value) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateProjectStatusCategory/${id}`, { project_status: value });
        return response; // Ensure response is returned
    } catch (error) {
        console.log('Unexpected error:', error);
        throw error; // Rethrow the error to be handled in the caller function
    }
};


export const deleteProject = async (id, image) => {
    try {
        await axios.delete(`${API_BASE_URL}/deleteProject/${id}`, { data: { image } });
        
    } catch (error) {
        console.error('Error deleting Project:', error);
    }
};

//adding a project
// Fetch a project by ID
export const fetchProjectById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getProjectById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

// Add a new project
export const addProject = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addProject`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};

// Update an existing project
export const updateProject = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/updateProject/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

const BASE_URL_CITIES = 'https://star-estate-api.onrender.com';
const BASE_URL_DEVELOPERS = 'https://star-estate-api.onrender.com/developers';



// Fetch cities
export const fetchCities = async () => {
    try {
        const response = await axios.get(`${BASE_URL_CITIES}/city/getCities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

// Fetch developers
export const fetchDevelopers = async () => {
    try {
        const response = await axios.get(`${BASE_URL_DEVELOPERS}/getDeveloper`);
        return response.data;
    } catch (error) {
        console.error('Error fetching developers:', error);
        throw error;
    }
};

// Fetch localities by city ID
export const fetchLocalitiesByCity = async (cityId) => {
    try {
        const response = await axios.get(`${BASE_URL_CITIES}/subCity/getSubCityByCity/${cityId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching localities:', error);
        throw error;
    }
};

