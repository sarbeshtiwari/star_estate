import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar'; 

const AddReportGallery = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [glid, setGlid] = useState('');
    const [images, setImages] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const rpgid = params.get('rpgid');
        if (rpgid) {
            setGlid(rpgid);
            fetchImages(rpgid); // Fetch images on component mount
        }
    }, []);

    const fetchImages = (glid) => {
        axios.get(`/api/getImages?glid=${glid}`) // Ensure this endpoint is correct
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        axios.post('/api/addImage', formData, { // Ensure this endpoint is correct
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setStatusMessage(response.data);
            fetchImages(glid); // Refresh images after successful upload
        })
        .catch(error => {
            console.error('Error adding image:', error);
        });
    };

    const handleDeleteImage = (id, evimage) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            axios.get(`/api/deleteImage?id=${id}&evimage=${evimage}`) // Ensure this endpoint is correct
                .then(response => {
                    setStatusMessage(response.data);
                    fetchImages(glid); // Refresh images after successful deletion
                })
                .catch(error => {
                    console.error('Error deleting image:', error);
                });
        }
    };

    return (
        <div className={`wrapper ${sidebarOpen ? 'sidebar_open' : ''}`}>
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div id="content">
                <div className="topbar">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="full">
                            <button
                                type="button"
                                id="sidebarCollapse"
                                className="sidebar_toggle"
                                onClick={toggleSidebar}
                            >
                                <i className="fa fa-bars"></i>
                            </button>
                            <div className="right_topbar">
                                <div className="icon_info">
                                    <ul className="user_profile_dd">
                                        <li>
                                            <a className="dropdown-toggle" data-toggle="dropdown">
                                                <span className="name_user">Welcome </span>
                                            </a>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" to="/userlists">
                                                    <span>User List</span> <i className="fa fa-user"></i>
                                                </Link>
                                                <Link className="dropdown-item" to="/logout">
                                                    <span>Log Out</span> <i className="fa fa-sign-out"></i>
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Manage Report Gallery</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/manageReport" className="btn btn-primary btn-xs float-right">Back</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <span className="status text-danger">{statusMessage}</span>
                                        <form onSubmit={handleFormSubmit} id="gallform" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Event Image</label>
                                                    <input type="file" name="evgallery" id="evgallery" className="form-control" multiple />
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                <input type="hidden" name="reportid" value={glid} />
                                                <input type="hidden" name="addevgall" value="active" />
                                                <button className="main_bt" type="submit">Submit</button>
                                            </div>
                                        </form>
                                        <div className="row mt-3 mx-auto">
                                            {images.map(image => (
                                                <div key={image.id} className="col-sml-3 mr-2">
                                                    <a href="#" onClick={() => handleDeleteImage(image.id, image.image1)} className="position-absolute text-danger"><i className="fa fa-trash"></i></a>
                                                    <img src={`../uploads/reports/${image.image1}`} alt="Event Image" width="300" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReportGallery;
