import React, { useState, useEffect } from 'react';
import { fetchJobs, updateJobStatus, deleteJob } from '../../../../api/job/job_api';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';

const JobPost = () => {
    const [jobs, setJobs] = useState([]);
    // const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        setLoading(true);
        try {
            const jobData = await fetchJobs();
            setJobs(jobData);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setLoading(true);
        try {
            const result = await updateJobStatus(id, status);
            if (result.success) {
                loadJobs();
            } else {
                setError(result.message);
                console.error('Error updating job status:', result.message);
            }
        } catch (error) {
            setError(error.message);
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            setLoading(true);
            try {
                await deleteJob(id);
                alert("Data is Deleted");
                loadJobs();
            } catch (error) {
                setError(error.message);
                console.error('Error deleting job:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
         {/* <div className={`wrapper ${sidebarOpen ? 'sidebar_open' : ''}`}> */}
            <Sidebar />
             {/* <div id="content"> */}
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Career</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/AddCareer/add" className="btn btn-success btn-xs">Add Career</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        {loading && <div className="loading">Loading...</div>}
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="table-responsive-sm">
                                            <table id="subct" className="table table-striped projects">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Position</th>
                                                        <th>NOS</th>
                                                        <th>Location</th>
                                                        <th>Qualification</th>
                                                        <th>Min Exp.</th>
                                                        <th>Added on</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {jobs.map((job, index) => (
                                                        <tr key={job._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{job.position}</td>
                                                            <td>{job.nos}</td>
                                                            <td>{job.location}</td>
                                                            <td>{job.qualification}</td>
                                                            <td>{job.min_exp}</td>
                                                            <td>{job.added_on}</td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        <button
                                                                            className={`btn btn-xs ${job.status === false ? 'btn-warning' : 'btn-success'}`}
                                                                            onClick={() => handleUpdateStatus(job._id, !job.status)}
                                                                        >
                                                                            {job.status === false ? 'Deactive' : 'Active'}
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/AddCareer/${job._id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => handleDeleteJob(job._id)}
                                                                        >
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             {/* </div>
        </div> */}
        </>
    );
};

export default JobPost;
