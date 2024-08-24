import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { fetchDeveloperById, addDeveloper, updateDeveloper } from '../../../../../api/developer/developer_api';

export default function AddDeveloper() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        developerName: '',
        no_of_projects: '',
        establishYear: '',
        ongoingProjects: '',
        experience: '',
        developerPriority: '',
        description: '',
        developerLogo: null
    });
    const [loading, setLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (id !== 'add') {
            const loadDeveloper = async () => {
                try {
                    const data = await fetchDeveloperById(id);
                    setFormData({
                        ...data,
                        developerLogo: null // Reset logo file
                    });
                } catch (error) {
                    console.error('Error fetching developer:', error.message);
                } finally {
                    setLoading(false);
                }
            };
            loadDeveloper();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const valid = validateImage(file);
        if(valid) 
            setFormData(prevState => ({
                ...prevState,
                developerLogo: file
            }));
    };

    const validateImage = (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const reader = new FileReader();
    
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
    
                let fileType = "";
                switch (header) {
                    case "89504e47":
                        fileType = "image/png";
                        break;
                    case "52494646":
                        fileType = "image/webp";
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        fileType = "image/jpeg";
                        break;
                    default:
                        fileType = "unknown";
                        break;
                }
    
                if (!allowedTypes.includes(fileType)) {
                    reject("Only JPG, JPEG, WEBP, and PNG formats are allowed.");
                } else {
                    resolve(file);
                }
            };
    
            reader.onerror = () => reject("Error reading file.");
            reader.readAsArrayBuffer(file);
        });
    };


    const validateForm = () => {
        const errors = {};
        if (!formData.developerName) errors.developerName = 'Location Type is required';
        if (!formData.no_of_projects) errors.no_of_projects = 'Location is required';
        if (!formData.establishYear) errors.establishYear = 'State is required';
        if (!formData.description) errors.description = 'Content is required';
        if (!formData.developerLogo) errors.developerLogo = 'Image is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        
        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        }

        setLoading(true);
        try {
            let response;
            if (id !== 'add') {
                response = await updateDeveloper(id, data);
                console.log('Developer updated successfully');
            } else {
                response = await addDeveloper(data);
                console.log('Developer added successfully');
            }
            navigate('/developer'); // Navigate back to the developer list
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to create a URL for the image preview
    const getLogoPreviewUrl = () => {
        return formData.developerLogo ? URL.createObjectURL(formData.developerLogo) : '';
    };


    return (
        <div >
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id !== 'add' ? 'Edit Developer' : 'Add Developer'}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                    <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="form-row mb-3">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        name="metaTitle"
                                                        value={formData.metaTitle}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Meta Title"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Keyword</label>
                                                    <input
                                                        type="text"
                                                        name="metaKeyword"
                                                        value={formData.metaKeyword}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Meta Keyword"
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Meta Description</label>
                                                    <textarea
                                                        name="metaDescription"
                                                        value={formData.metaDescription}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        rows="3"
                                                        placeholder="Meta Description"
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Developer Name</label>
                                                    <input
                                                        type="text"
                                                        name="developerName"
                                                        value={formData.developerName}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.developerName ? 'is-invalid' : ''}`}
                                                        placeholder="Developer Name"
                                                        
                                                    />
                                                    {validationErrors.developerName && (
                                                            <div className="invalid-feedback">{validationErrors.developerName}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">No. Of Projects</label>
                                                    <input
                                                        type="number"
                                                        name="no_of_projects"
                                                        value={formData.no_of_projects}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.no_of_projects ? 'is-invalid' : ''}`}
                                                        placeholder="Eg: 50"
                                                        
                                                    />
                                                    {validationErrors.no_of_projects && (
                                                            <div className="invalid-feedback">{validationErrors.no_of_projects}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Establish Year</label>
                                                    <input
                                                        type="number"
                                                        name="establishYear"
                                                        value={formData.establishYear}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.establishYear ? 'is-invalid' : ''}`}
                                                        placeholder="Eg: 1885"
                                                        
                                                    />
                                                    {validationErrors.establishYear && (
                                                            <div className="invalid-feedback">{validationErrors.establishYear}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Ongoing Projects</label>
                                                    <input
                                                        type="number"
                                                        name="ongoingProjects"
                                                        value={formData.ongoingProjects}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Eg: 8"
                                                    />
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Experience</label>
                                                    <input
                                                        type="number"
                                                        name="experience"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Eg: 140"
                                                    />
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Developer Priority</label>
                                                    <input
                                                        type="number"
                                                        name="developerPriority"
                                                        value={formData.developerPriority}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Eg: 2"
                                                        
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Description</label>
                                                    <textarea
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                                                        rows="3"
                                                        placeholder="Description"
                                                    ></textarea>
                                                    {validationErrors.description && (
                                                            <div className="invalid-feedback">{validationErrors.description}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Developer Logo</label>
                                                    <input
                                                        type="file"
                                                        name="developerLogo"
                                                        onChange={handleFileChange}
                                                        className={`form-control ${validationErrors.developerLogo ? 'is-invalid' : ''}`}
                                                    />
                                                    {validationErrors.developerLogo && (
                                                            <div className="invalid-feedback">{validationErrors.developerLogo}</div>
                                                        )}
                                                    {formData.developerLogo && (
                                                        <img
                                                            src={getLogoPreviewUrl()}
                                                            alt="Developer Logo"
                                                            className="img-thumbnail mt-2"
                                                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="form-group margin_0">
                                                {id === 'add' ? ( 
                                                    <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>) : ( <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>)}
                                               
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
