import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './sidebar';
import axios from 'axios';

const Addreport = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [formData, setFormData] = useState({
        reportTitle: '',
        reportDate: '',
        fileType: '',
        accessibility: '',
        file: null,
        content: '',
        rpid: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { reportTitle, reportDate, fileType, accessibility, content, file } = formData;

        if (!reportTitle) {
            setStatusMessage("Report Title is required");
            return;
        }
        if (!reportDate) {
            setStatusMessage("Report Date is required");
            return;
        }
        if (!fileType) {
            setStatusMessage("File Type is required");
            return;
        }
        if (!accessibility) {
            setStatusMessage("Accessibility is required");
            return;
        }
        if (!content) {
            setStatusMessage("Content is required");
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('reportTitle', reportTitle);
        formDataToSubmit.append('reportDate', new Date(reportDate).toISOString());
        formDataToSubmit.append('fileType', fileType);
        formDataToSubmit.append('accessibility', accessibility);
        formDataToSubmit.append('content', content);

        if (file) {
            formDataToSubmit.append('file', file);
        }

        try {
            const response = await axios.post('http://localhost:3001/addReport', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = response.data;

            if (result.success) {
                alert('Report added successfully');
                navigate('/manageReport'); // Redirect after successful submission
            } else {
                alert(`Failed to add report: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            setStatusMessage('Error submitting report');
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
                                aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                            >
                                <i className="fa fa-bars"></i>
                            </button>
                            <div className="right_topbar">
                                <div className="icon_info">
                                    <ul className="user_profile_dd">
                                        <li>
                                            <a
                                                className="dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
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
                                    <h2>{!formData.rpid ? 'Add' : 'Edit'} Manage Reports</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="" className="btn btn-primary btn-xs float-right">Back</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <span className="status text-danger">{statusMessage}</span>
                                        <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Report Title</label>
                                                    <input
                                                        type="text"
                                                        name="reportTitle"
                                                        className="form-control"
                                                        value={formData.reportTitle}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Report Date</label>
                                                    <input
                                                        type="date"
                                                        name="reportDate"
                                                        className="form-control"
                                                        value={formData.reportDate}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">File Type</label>
                                                    <select
                                                        name="fileType"
                                                        className="form-control"
                                                        value={formData.fileType}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">---</option>
                                                        <option value="PDF">PDF</option>
                                                        <option value="Image">Image</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Accessibility</label>
                                                    <select
                                                        name="accessibility"
                                                        className="form-control"
                                                        value={formData.accessibility}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">---</option>
                                                        <option value="Suncity School 45">Suncity School 45</option>
                                                        <option value="Suncity School 54">Suncity School 54</option>
                                                        <option value="International">International</option>
                                                        <option value="all">All</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">File</label>
                                                    <input
                                                        type="file"
                                                        name="file"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Content</label>
                                                    <textarea
                                                        name="content"
                                                        className="form-control"
                                                        value={formData.content}
                                                        onChange={handleChange}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="form-group margin_0">
                                                <input type="hidden" name="rpid" value={formData.rpid || ''} />
                                                <button className="main_bt" type="submit">Submit</button>
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
};

export default Addreport;
