import { useState, useEffect } from 'react';
import { fetchJobDetails, addJob, updateJob } from '../../../../api/job/job_api';
import { useNavigate } from 'react-router-dom';

const useJobForm = (id) => {
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        position: '',
        nos: '',
        location: '',
        qualification: '',
        min_exp: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            loadJobDetails(id);
        }
    }, [id]);

    const loadJobDetails = async (id) => {
        setLoading(true);
        try {
            const jobData = await fetchJobDetails(id);
            setFormData({
                metaTitle: jobData.metaTitle || '',
                metaKeyword: jobData.metaKeyword || '',
                metaDescription: jobData.metaDescription || '',
                position: jobData.position,
                nos: jobData.nos,
                location: jobData.location,
                qualification: jobData.qualification,
                min_exp: jobData.min_exp,
                description: jobData.description,
            });
            setEditorHtml(jobData.description || '');
        } catch (error) {
            setStatusMessage('Error fetching job details');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditorChange = (value) => {
        setEditorHtml(value);
        setFormData(prevData => ({
            ...prevData,
            description: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.position) errors.position = 'Position is required';
        if (!formData.nos) errors.nos = 'Number of Seats is required';
        if (!formData.location) errors.location = 'Location is required';
        if (!formData.qualification) errors.qualification = 'Qualification is required';
        if (!formData.min_exp) errors.min_exp = 'Minimum Experience is required';
        if (!editorHtml) errors.description = 'Description is required';

       
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const { position, nos, location, qualification, min_exp, description } = formData;

        if (!position || !nos || !location || !qualification || !min_exp || !description) {
            setStatusMessage("Enter required data");
            return;
        }

        setLoading(true);
        try {
            let result;
            if (id === 'add') {
                result = await addJob(formData);
            } else {
                result = await updateJob(id, formData);
            }

            if (result.success) {
                navigate(-1);
                return { success: true, message: 'Job saved successfully' };
                
            } else {
                return { success: false, message: `Failed to save job: ${result.message}` };
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            return { success: false, message: 'Error submitting form' };
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        editorHtml,
        statusMessage,
        loading,
        validationErrors,
        handleInputChange,
        handleEditorChange,
        handleSubmit
    };
};

export default useJobForm;
