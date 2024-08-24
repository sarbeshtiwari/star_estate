// apiService.js
import axios from 'axios';

const BASE_URL = 'https://star-estate-api.onrender.com';

// Fetch all jobs
export const fetchJobs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/jobs/getJobs`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching jobs');
    }
};

// Update job status
export const updateJobStatus = async (id, status) => {
    try {
        const response = await axios.put(`${BASE_URL}/jobs/updateJobStatus/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Error updating job status');
    }
};

// Delete job
export const deleteJob = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/jobs/deleteJob/${id}`);
    } catch (error) {
        throw new Error('Error deleting job');
    }
};

// Fetch job details by ID
export const fetchJobDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/jobs/getJobByID/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching job details');
    }
};

// Add new job
export const addJob = async (jobData) => {
    try {
        const response = await axios.post(`${BASE_URL}/jobs/addJob`, jobData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding job');
    }
};

// Update job details
export const updateJob = async (id, jobData) => {
    try {
        const response = await axios.put(`${BASE_URL}/jobs/updateJob/${id}`, jobData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating job');
    }
};
