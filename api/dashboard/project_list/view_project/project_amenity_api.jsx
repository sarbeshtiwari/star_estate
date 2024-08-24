import axios from "axios";

const $API_URL = `https://star-estate-api.onrender.com/projectAmenities`;

export const ProjectAmenities = async (amenityId, status, projectname) => {
    try{
        const response = await axios.post(`${$API_URL}/projectAmenities/${amenityId}`,{status, projectname});
        return response.data;
    }catch(error){
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow to handle in the component
    }
}

export const getProjectAmenities = async (projectname) => {
    try {
        const response = await axios.get(`${$API_URL}/getprojectAmenities/${projectname}`);
        return response.data;
    } catch (error){
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}