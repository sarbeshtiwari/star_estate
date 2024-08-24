import axios from 'axios';

const API_URL = 'https://star-estate-api.onrender.com';

// Fetch all events
export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events/getEvents`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch events');
    }
};

// Update event status
export const updateEventStatus = async (id, status) => {
    try {
        await axios.put(`${API_URL}/events/updateEventStatus/${id}`, { status });
    } catch (error) {
        throw new Error('Failed to update event status');
    }
};

// Delete an event
export const deleteEvent = async (id, image) => {
    try {
        await axios.delete(`${API_URL}/events/deleteEvent/${id}`, { data: { image } });
    } catch (error) {
        throw new Error('Failed to delete event');
    }
};



export const fetchEventById = async (id) => {
    return axios.get(`${API_URL}/events/getEventById/${id}`);
};

export const addEvent = async (data) => {
    return axios.post(`${API_URL}/events/addEvents`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const updateEvent = async (id, data) => {
    return axios.put(`${API_URL}/events/updateEvent/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};



export const fetchImages = async (eventId) => {
    return axios.get(`${API_URL}/images/getEventImages/${eventId}`);
};

export const updateImageStatus = async (imageId, status) => {
    return axios.put(`${API_URL}/images/updateEventImageStatus/${imageId}`, { status });
};

export const deleteImage = async (imageId, imagePath) => {
    return axios.delete(`${API_URL}/images/deleteEventImage/${imageId}`, { data: { imagePath } });
};
