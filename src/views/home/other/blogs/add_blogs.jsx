import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { fetchBlogById, addBlog, updateBlog } from '../../../../../api/blogs/blogs_api';

export default function AddBlogs() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        blogsName: '',
        blogsBy: '',
        blogsDate: '',
        blogsCategory: '',
        blogsLink: '',
        blogsImage: null,
        imageTitle: '',
        content: ''
    });

    useEffect(() => {
        if (id !== 'add') {
            fetchBlog(id);
        }
    }, [id]);

    const fetchBlog = async (id) => {
        try {
            const blog = await fetchBlogById(id);
            setFormData(blog);
        } catch (err) {
            console.error('Failed to fetch data:', err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            blogsImage: file
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
            if (id !== 'add') {
                await updateBlog(id, data);
            } else {
                await addBlog(data);
            }
            navigate('/blogs');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const getImagePreviewUrl = () => {
        return formData.blogsImage ? URL.createObjectURL(formData.blogsImage) : '';
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
                                    <h2>{id === 'add' ? 'Add Blogs' : 'Edit Blog'}</h2>
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
                                        <form onSubmit={handleSubmit} id="add_blogs" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        name="metaTitle"
                                                        value={formData.metaTitle}
                                                        onChange={handleInputChange}
                                                        className="form-control"
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
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Meta Description</label>
                                                    <textarea
                                                        name="metaDescription"
                                                        value={formData.metaDescription}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        rows="5"
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Blogs Name</label>
                                                    <input
                                                        type="text"
                                                        name="blogsName"
                                                        value={formData.blogsName}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blogs By</label>
                                                    <input
                                                        type="text"
                                                        name="blogsBy"
                                                        value={formData.blogsBy}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blogs Date</label>
                                                    <input
                                                        type="date"
                                                        name="blogsDate"
                                                        value={formData.blogsDate}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blogs Category</label>
                                                    <select
                                                        name="blogsCategory"
                                                        value={formData.blogsCategory}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select category</option>
                                                        <option value="blog">Blog</option>
                                                        <option value="news">News</option>
                                                        <option value="research">Research</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blog Link</label>
                                                    <input
                                                        type="text"
                                                        name="blogsLink"
                                                        value={formData.blogsLink}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Blogs Image</label>
                                                    <input
                                                        type="file"
                                                        name="blogsImage"
                                                        onChange={handleFileChange}
                                                        className="form-control"
                                                    />
                                                    {formData.blogsImage && (
                                                        <img
                                                            // src={getImagePreviewUrl()}
                                                            alt="Blogs Image"
                                                            className="img-thumbnail mt-2"
                                                            width="120"
                                                            height="70"
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Image Title</label>
                                                    <input
                                                        type="text"
                                                        name="imageTitle"
                                                        value={formData.imageTitle}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Content</label>
                                                    <textarea
                                                        name="content"
                                                        value={formData.content}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="form-group margin_0">
                                                <button className="main_bt" type="submit">
                                                  {id === 'add' ? 'Submit' : 'Update'}
                                                </button>
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
