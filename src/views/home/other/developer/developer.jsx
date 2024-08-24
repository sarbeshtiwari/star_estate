import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { fetchDevelopers, updateDeveloperStatus, deleteDeveloper } from '../../../../../api/developer/developer_api';
import image from '../../../../assets/images/logo.png'; // Default image

export default function Developer() {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDevelopers = async () => {
            try {
                const data = await fetchDevelopers();
                setDevelopers(data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        
        loadDevelopers();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateDeveloperStatus(id, status);
            if (response.success) {
                console.log('Developer status updated successfully!');
                const data = await fetchDevelopers();
                setDevelopers(data);
            } else {
                console.error('Error updating developer status:', response.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error.message);
        }
    };

    const handleDelete = async (id, image) => {
        if (window.confirm('Are you sure you want to delete this developer?')) {
            try {
                await deleteDeveloper(id, image);
                const data = await fetchDevelopers();
                setDevelopers(data);
            } catch (error) {
                console.error('Error deleting developer:', error.message);
            }
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
                                    <h2>Developer</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addDeveloper/add" className="btn btn-success btn-xs">Add Developer</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                    <div id="subct_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="dataTables_length" id="subct_length">
                                            <label>
                                                Show 
                                                <select name="subct_length" aria-controls="subct" className="">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select> entries
                                            </label>
                                        </div>
                                        <div id="subct_filter" className="dataTables_filter">
                                            <label>
                                                Search:
                                                <input type="search" className="" placeholder="" aria-controls="subct" />
                                            </label>
                                        </div>
                                        <div className="table-responsive">
                                            <table id="subct" className="table table-striped projects dataTable no-footer" aria-describedby="subct_info">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Developer Logo</th>
                                                        <th>Developer Name</th>
                                                        <th>Establish Year</th>
                                                        <th>Total Projects</th>
                                                        <th>Ongoing Projects</th>
                                                        <th>Developer Priority</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {developers.map((developer, index) => (
                                                        <tr key={developer._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>
                                                                <img 
                                                                    src={developer.developerLogo ? `https://star-estate-api.onrender.com/uploads/developers/${developer.developerLogo}` : image}
                                                                    className="rounded-circle"
                                                                    style={{ objectFit: 'cover' }}
                                                                    alt={developer.developerName}
                                                                    width="50"
                                                                    height="50"
                                                                />
                                                            </td>
                                                            <td>{developer.developerName}</td>
                                                            <td>{developer.establishYear}</td>
                                                            <td>{developer.no_of_projects}</td>
                                                            <td>{developer.ongoingProjects}</td>
                                                            <td>{developer.developerPriority}</td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        {developer.status === false ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(developer._id, true)}>Deactive</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(developer._id, false)}>Active</button>
                                                                        )}
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/addDeveloper/${developer._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => handleDelete(developer._id, developer.developerLogo)}
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
                                        <div className="dataTables_info" id="subct_info" role="status" aria-live="polite">
                                            Showing 1 to {developers.length} of {developers.length} entries
                                        </div>
                                        <div className="dataTables_paginate paging_simple_numbers" id="subct_paginate">
                                            <Link className="paginate_button previous disabled" aria-controls="subct" aria-disabled="true" data-dt-idx="previous" tabIndex="-1" id="subct_previous">Previous</Link>
                                            <span>
                                                {[...Array(Math.ceil(developers.length / 10)).keys()].map(page => (
                                                    <Link key={page} className="paginate_button current" aria-controls="subct" aria-current="page" data-dt-idx={page} tabIndex="0">{page + 1}</Link>
                                                ))}
                                            </span>
                                            <Link className="paginate_button next" aria-controls="subct" data-dt-idx="next" tabIndex="0" id="subct_next">Next</Link>
                                        </div>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
