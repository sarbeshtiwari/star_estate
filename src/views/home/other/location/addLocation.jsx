import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { fetchCityDetails, addCity, updateCity } from '../../../../../api/location/location_api';

export default function AddLocation() {
    const navigate = useNavigate();
    const { ids, id } = useParams();

    const [formData, setFormData] = useState({
        meta_title: '',
        meta_key: '',
        meta_desc: '',
        location_type: '',
        location: '',
        state: '',
        priority: '',
        ctcontent: '',
        schema: '',
        content_above_faqs: ''
    });

    const [image, setImage] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id !== 'add') {
            fetchCityDetails(ids, id)
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        const city = data[0];
                        const specificDataItem = city.data.find(item => item.location_type === id);
                        if (specificDataItem) {
                            setFormData({
                                meta_title: specificDataItem.metaTitle || '',
                                meta_key: specificDataItem.metaKeyword || '',
                                meta_desc: specificDataItem.metaDescription || '',
                                location_type: specificDataItem.location_type || '',
                                location: city.location || '',
                                state: city.state || '',
                                priority: city.priority || '',
                                ctcontent: specificDataItem.ctcontent || '',
                                schema: specificDataItem.schema || '',
                                content_above_faqs: specificDataItem.content_above_faqs || ''
                            });
                        } else {
                            console.error('Specific data item not found');
                        }
                    } else {
                        console.error('City array is empty or not an array');
                    }
                })
                .catch(error => console.error(error));
        }
    }, [ids, id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const valid = validateImage(e.target.files[0]);
        if (valid) {
        setImage(e.target.files[0]);}
        else{
            
        }
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
        if (!formData.location_type) errors.location_type = 'Location Type is required';
        if (!formData.location) errors.location = 'Location is required';
        if (!formData.state) errors.state = 'State is required';
        if (!formData.ctcontent) errors.ctcontent = 'Content is required';
        if (!image) errors.image = 'Image is required';
        return errors;
    };

    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        const { meta_title, meta_key, meta_desc, location_type, location, state, priority, ctcontent, schema, content_above_faqs } = formData;
    
        // Prepare form data
        const dataArray = [{
            location_type: location_type,
            metaTitle: meta_title || ' ',
            metaKeyword: meta_key || ' ',
            metaDescription: meta_desc || ' ',
            ctcontent: ctcontent || ' ',
            schema: schema || ' ',
            content_above_faqs: content_above_faqs || ' ',
            image: image ? image.name : ''  // Add image name or path if needed
        }];
    
        const formDataToSend = new FormData();
        formDataToSend.append('location', location);
        formDataToSend.append('state', state);
        formDataToSend.append('priority', priority || ' ');
        formDataToSend.append('data', JSON.stringify(dataArray));
        if (image) {
            formDataToSend.append('image', image);
        }
    
        try {
            let result;
            if (id === 'add') {
                result = await addCity(formDataToSend);
            } else {
                result = await updateCity(ids, id, formDataToSend);
            }
    
            if (result.success) {
                alert('City saved successfully');
                navigate('/location');
            } else {
                alert(`Failed to save City: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <>
            <div>
                <Sidebar />
                <div>
                    <div className="midde_cont">
                        <div className="container-fluid">
                            <div className="row column_title">
                                <div className="col-md-12">
                                    <div className="page_title">
                                        <h2>{id === 'add' ? 'Add Location' : 'Edit Location'}</h2>
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
                                            <form onSubmit={handleFormSubmit} id="citiesform" encType="multipart/form-data">
                                                <span className="status text-danger mb-0"></span>
                                                <div className="form-row mb-3">
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Meta Title</label>
                                                        <input type="text" name="meta_title" id="meta_title" value={formData.meta_title} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Meta Keywords</label>
                                                        <input type="text" name="meta_key" id="meta_key" value={formData.meta_key} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Meta Description</label>
                                                        <textarea name="meta_desc" id="meta_desc" value={formData.meta_desc} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Location Type</label>
                                                        <select name="location_type" id="location_type" value={formData.location_type} onChange={handleInputChange} className={`form-control ${validationErrors.location_type ? 'is-invalid' : ''}`}>
                                                            <option value=""></option>
                                                            <option value="Common">Common</option>
                                                            <option value="Apartment">Apartment</option>
                                                            <option value="New Projects">New Projects</option>
                                                            <option value="Flat">Flat</option>
                                                            <option value="Commercial">Commercial</option>
                                                            <option value="studio">Studio</option>
                                                        </select>
                                                        {validationErrors.location_type && (
                                                            <div className='invalid-feedback'>{validationErrors.location_type}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Location</label>
                                                        <input type="text" name="location" id="location" value={formData.location} onChange={handleInputChange} className={`form-control ${validationErrors.location ? 'is-invalid' : ''}`} />
                                                        {validationErrors.location && (
                                                            <div className="invalid-feedback">{validationErrors.location}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">State</label>
                                                        <input type="text" name="state" id="state" value={formData.state} onChange={handleInputChange}  className={`form-control ${validationErrors.state ? 'is-invalid' : ''}`} />
                                                        {validationErrors.state && (
                                                            <div className="invalid-feedback">{validationErrors.state}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">Priority</label>
                                                        <input type="text" name="priority" id="priority" value={formData.priority} onChange={handleInputChange} className="form-control" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label className="label_field">City Image</label>
                                                        <input type="file" name="image" id="image" onChange={handleFileChange}  className={`form-control ${validationErrors.image ? 'is-invalid' : ''}`} />
                                                        {validationErrors.image && (
                                                            <div className="invalid-feedback">{validationErrors.image}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Content</label>
                                                        <textarea name="ctcontent" id="ctcontent" value={formData.ctcontent} onChange={handleInputChange}  className={`form-control ${validationErrors.ctcontent ? 'is-invalid' : ''}`} rows="5"></textarea>
                                                        {validationErrors.ctcontent && (
                                                            <div className="invalid-feedback">{validationErrors.ctcontent}</div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Schema</label>
                                                        <textarea name="schema" id="schema" value={formData.schema} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Content Above FAQs</label>
                                                        <textarea name="content_above_faqs" id="content_above_faqs" value={formData.content_above_faqs} onChange={handleInputChange} className="form-control" rows="5"></textarea>
                                                    </div>
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
                                                <span id="result" className="text-danger mt-4 d-block"></span>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
