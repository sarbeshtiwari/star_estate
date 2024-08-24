import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchEventById, addEvent, updateEvent } from '../../../../../api/events/events_api'; // Adjust the path as needed

export default function AddEvents() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        eventName: '',
        eventDate: '',
        eventImage: null
    });
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (id !== 'add') {
            fetchEvent(id);
        }
    }, [id]);

    const fetchEvent = async (id) => {
        try {
            const response = await fetchEventById(id);
            setFormData(response.data);
            if (response.data.eventImage) {
                setPreviewUrl(`https://star-estate-api.onrender.com/uploads/events/${response.data.eventImage}`);
            }
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            eventImage: file
        }));
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.eventName || !formData.eventDate || !formData.eventImage) {
            console.error('Please fill in all required fields.');
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        }

        try {
            let response;
            if (id !== 'add') {
                response = await updateEvent(id, data);
            } else {
                response = await addEvent(data);
            }
            console.log('Success:', response.data);
            navigate('/events');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id === 'add' ? 'Add Events' : 'Edit Events'}</h2>
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
                                        <form onSubmit={handleSubmit} id="add_eventsform" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        name="metaTitle"
                                                        id="metaTitle"
                                                        className="form-control"
                                                        value={formData.metaTitle}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Keyword</label>
                                                    <input
                                                        type="text"
                                                        name="metaKeyword"
                                                        id="metaKeyword"
                                                        className="form-control"
                                                        value={formData.metaKeyword}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Meta Description</label>
                                                    <textarea
                                                        name="metaDescription"
                                                        id="metaDescription"
                                                        className="form-control"
                                                        rows="5"
                                                        value={formData.metaDescription}
                                                        onChange={handleInputChange}
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Events Name</label>
                                                    <input
                                                        type="text"
                                                        name="eventName"
                                                        id="eventName"
                                                        className="form-control"
                                                        value={formData.eventName}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Events Date</label>
                                                    <input
                                                        type="date"
                                                        name="eventDate"
                                                        id="eventDate"
                                                        className="form-control"
                                                        value={formData.eventDate}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Events Image</label>
                                                    <input
                                                        type="file"
                                                        name="eventImage"
                                                        id="eventImage"
                                                        className="form-control"
                                                        onChange={handleFileChange}
                                                    />
                                                    {previewUrl && (
                                                        <img
                                                            src={previewUrl}
                                                            alt="Events Image Preview"
                                                            className="img-thumbnail"
                                                            width="120"
                                                            height="70"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                <button className="main_bt" type="submit">{id === 'add' ? 'Submit' : 'Update'}</button>
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
