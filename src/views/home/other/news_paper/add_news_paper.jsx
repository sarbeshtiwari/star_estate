import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchNewsById, addNews, updateNews } from '../../../../../api/news/news_api'; // Adjust the path as needed

export default function AddNewsPaper() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDesc: '',
        heading: '',
        paperName: '',
        newsDate: '',
        newsState: '',
        imageTitle: '',
        newsThumb: null,
        newsImage: null
    });

    useEffect(() => {
        if (id !== 'add') {
            fetchNews(id);
        }
    }, [id]);

    const fetchNews = async (id) => {
        try {
            const response = await fetchNewsById(id);
            setFormData(response.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: file
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        }

        try {
            let response;
            if (id !== 'add') {
                // Update existing news
                response = await updateNews(id, data);
            } else {
                // Add new news
                response = await addNews(data);
            }
            console.log('Success:', response.data);
            navigate(-1); // Navigate back to the previous page
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    // Helper function to create a URL for the image preview
    const getFilePreviewUrl = (file) => {
        return file ? URL.createObjectURL(file) : '';
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
                                    <h2>{id !== 'add' ? 'Edit News Paper' : 'Add News Paper'}</h2>
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
                                        <form onSubmit={handleSubmit} id="add_news" encType="multipart/form-data">
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
                                                        name="metaDesc"
                                                        id="metaDesc"
                                                        className="form-control"
                                                        rows="5"
                                                        value={formData.metaDesc}
                                                        onChange={handleInputChange}
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Heading</label>
                                                    <input
                                                        type="text"
                                                        name="heading"
                                                        id="heading"
                                                        className="form-control"
                                                        value={formData.heading}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">News Paper Name</label>
                                                    <input
                                                        type="text"
                                                        name="paperName"
                                                        id="paperName"
                                                        className="form-control"
                                                        value={formData.paperName}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">News Date</label>
                                                    <input
                                                        type="date"
                                                        name="newsDate"
                                                        id="newsDate"
                                                        className="form-control"
                                                        value={formData.newsDate}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">News State</label>
                                                    <input
                                                        type="text"
                                                        name="newsState"
                                                        id="newsState"
                                                        className="form-control"
                                                        value={formData.newsState}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Image Title</label>
                                                    <input
                                                        type="text"
                                                        name="imageTitle"
                                                        id="imageTitle"
                                                        className="form-control"
                                                        value={formData.imageTitle}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">News Thumb</label>
                                                    <input
                                                        type="file"
                                                        name="newsThumb"
                                                        id="newsThumb"
                                                        className="form-control"
                                                        onChange={handleFileChange}
                                                    />
                                                    {formData.newsThumb && (
                                                        <img
                                                            // src={getFilePreviewUrl(formData.newsThumb)}
                                                            alt="Thumbnail Preview"
                                                            className="img-thumbnail mt-2"
                                                            width="120"
                                                            height="70"
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">News Image</label>
                                                    <input
                                                        type="file"
                                                        name="newsImage"
                                                        id="newsImage"
                                                        className="form-control"
                                                        onChange={handleFileChange}
                                                    />
                                                    {formData.newsImage && (
                                                        <img
                                                            // src={getFilePreviewUrl(formData.newsImage)}
                                                            alt="Image Preview"
                                                            className="img-thumbnail mt-2"
                                                            width="120"
                                                            height="70"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-group margin_0">
                                                <input type="hidden" name="newsid" value="" />
                                                <input type="hidden" name="addnews" value="yes" />
                                                <button type="submit" className="main_bt">{id === 'add' ? 'Submit' : 'Update'}</button>
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
