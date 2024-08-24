import React, { useState, useEffect } from 'react';
import Sidebar from '../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchSubCities, updateSubCityStatus, deleteSubCity } from '../../../../../../api/location/sub_city/sub_city_api';

export default function SubCities() {
    const [subCities, setSubCities] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSubCities = async () => {
            try {
                const data = await fetchSubCities(id);
                if (data.length === 0) {
                    alert("No data Found");
                }
                setSubCities(data);
            } catch (error) {
                console.error('Error fetching subCities:', error);
            }
        };

        getSubCities();
    }, [id]);

    const handleUpdateStatus = async (subCityId, status) => {
        try {
            const result = await updateSubCityStatus(subCityId, status);
            if (result.success) {
                console.log('City status updated successfully!');
                setSubCities(prev => prev.map(subCity =>
                    subCity._id === subCityId ? { ...subCity, status } : subCity
                ));
            } else {
                console.error('Error updating city status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDelete = async (subCityId) => {
        try {
            if (window.confirm('Are you sure you want to delete this category?')) {
                await deleteSubCity(subCityId);
                setSubCities(prev => prev.filter(subCity => subCity._id !== subCityId));
            }
        } catch (error) {
            console.error('Error deleting city:', error);
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
                                        <h2>Sub Cities</h2>
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
                                        <div className="full graph_head">
                                            <Link to={`/addSubCities/city/add`} className="btn btn-success btn-xs">Add Sub Cities</Link>
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
                                                <table className="table table-striped projects dataTable no-footer">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Cities</th>
                                                            <th>Sub City Name</th>
                                                            <th>Priority</th>
                                                            <th >FAQs</th>
                                                            <th>Content Type Update</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {subCities.length === 0 ? (
                                                            <tr>
                                                                <td colSpan="7">No Data Found</td>
                                                            </tr>
                                                        ) : (
                                                            subCities.map((subCity, index) => (
                                                                <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                    <td className="sorting_1">{index + 1}</td>
                                                                    <td>{subCity.city}</td>
                                                                    <td>{subCity.sub_city}</td>
                                                                    <td>{subCity.priority}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-center">
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/New`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i>New Projects</Link></li>
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/Residential`} className="btn btn-success btn-xs"><i className="fa fa-edit"></i>Residential</Link></li>
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/flat`} className="btn btn-info btn-xs"><i className="fa fa-edit"></i>Flats</Link></li>
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/apartment`} className="btn btn-warning btn-xs"><i className="fa fa-edit"></i>Apartments</Link></li>
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/studio`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Studio Apartments</Link></li>
                                                                            <li><Link to={`/SubCityfooterFAQ/${subCity.city}/residential`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Residential</Link></li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-center">
                                                                            <li><Link to={`/addSubCities/${subCity.city}/New Projects`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i>New Projects</Link></li>
                                                                            <li><Link to={`/addSubCities/${subCity.city}/Residential`} className="btn btn-success btn-xs"><i className="fa fa-edit"></i>Residential</Link></li>
                                                                            <li><Link to={`/addSubCities/${subCity.city}/Flat`} className="btn btn-info btn-xs"><i className="fa fa-edit"></i>Flats</Link></li>
                                                                            <li><Link to={`/addSubCities/${subCity.city}/Apartment`} className="btn btn-warning btn-xs"><i className="fa fa-edit"></i>Apartments</Link></li>
                                                                            <li><Link to={`/addSubCities/${subCity.city}/studio`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Studio Apartments</Link></li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {subCity.status === false ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(subCity._id, true)}>Deactive</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(subCity._id, false)}>Active</button>
                                                                                )}
                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/addSubCities/${subCity.city}/Common`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => handleDelete(subCity._id)}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            )))
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className="dataTables_info" id="subct_info" role="status" aria-live="polite">
                                                    Showing 1 to {subCities.length} of {subCities.length} entries
                                                </div>
                                                <div className="dataTables_paginate paging_simple_numbers" id="subct_paginate">
                                                    <Link className="paginate_button previous disabled" aria-controls="subct" aria-disabled="true" data-dt-idx="previous" tabIndex="-1" id="subct_previous">Previous</Link>
                                                    <span>
                                                        {[...Array(Math.ceil(subCities.length / 10)).keys()].map(page => (
                                                            <Link key={page} className="paginate_button current" aria-controls="subct" aria-current="page" data-dt-idx={page} tabIndex="0">{page + 1}</Link>
                                                        ))}
                                                    </span>
                                                    <Link className="paginate_button next" aria-controls="subct" data-dt-idx="next" tabIndex="0" id="subct_next">Next</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
