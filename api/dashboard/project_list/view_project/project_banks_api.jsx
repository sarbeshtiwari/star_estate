import axios from "axios";

const $API_URL = `https://star-estate-api.onrender.com/projectBanks`;

export const ProjectBanks = async (bankId, status, projectname) => {
    try{
        const response = await axios.post(`${$API_URL}/projectBanks/${bankId}`,{status, projectname});
        return response.data;
    }catch(error){
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const getProjectBanks = async (projectname) => {
    try {
        const response = await axios.get(`${$API_URL}/getprojectBanks/${projectname}`);
        return response.data;
    } catch (error){
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const addProjectBanksRatings = async (formData, id) => {
    try {
        const response = await axios.post(`${$API_URL}/projectsBanksData/${id}`, formData);
        return response.data;

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getProjectbanksRatings = async (id) => {
    try{
        const response = await axios.get(`${$API_URL}/getProjectbanksRatings/${id}`);
        return response.data;
    } catch{
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}