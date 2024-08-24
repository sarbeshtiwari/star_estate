import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link } from 'react-router-dom';
import { fetchCities, updateCityStatus, deleteCity } from '../../../../../api/location/location_api';

export default function Cities() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        loadCities();
    }, []);

    const loadCities = async () => {
        try {
            const data = await fetchCities();
            setCities(data);
        } catch (error) {
            console.error('Error loading cities:', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const result = await updateCityStatus(id, status);
            if (result.success) {
                console.log('City status updated successfully!');
                loadCities();
            } else {
                console.error('Error updating city status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteCity = async (id) => {
        try {
            await deleteCity(id);
            loadCities();
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
                                        <h2>Cities</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row column1">
                                <div className="col-md-12">
                                    <div className="white_shd full margin_bottom_30">
                                        <div className="full graph_head">
                                            <Link to="/addLocation/city/add" className="btn btn-success btn-xs">Add Cities</Link>
                                        </div>
                                        <div className="full price_table padding_infor_info">
                                        <div className="table-responsive">
                                            <table className="table table-striped projects dataTable no-footer">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Cities</th>
                                                        <th>State</th>
                                                        <th>Priority</th>
                                                        <th>Sub City</th>
                                                        {/* <th>City Configuration</th>
                                                        <th>FAQs</th> */}
                                                        <th>Footer FAQs</th>
                                                        <th>Content Type</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cities.map((city, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>{city.location}</td>
                                                            <td>{city.state}</td>
                                                            <td>{city.priority}</td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li><Link to={`/subCities/${city.location}`} className="btn btn-success btn-xs">Go</Link></li>
                                                                </ul>
                                                            </td>
                                                            {/* <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li><Link to={'/'} className="btn btn-success btn-xs">Go</Link></li>
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li><Link to={'/'} className="btn btn-success btn-xs">Go</Link></li>
                                                                </ul>
                                                            </td> */}
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li><Link to={`/footerFAQ/${city.location}/New`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i>New Projects</Link></li>
                                                                    <li><Link to={`/footerFAQ/${city.location}/commercial`} className="btn btn-success btn-xs"><i className="fa fa-edit"></i>Commercial</Link></li>
                                                                    <li><Link to={`/footerFAQ/${city.location}/flat`} className="btn btn-info btn-xs"><i className="fa fa-edit"></i>Flats</Link></li>
                                                                    <li><Link to={`/footerFAQ/${city.location}/apartment`} className="btn btn-warning btn-xs"><i className="fa fa-edit"></i>Apartments</Link></li>
                                                                    <li><Link to={`/footerFAQ/${city.location}/studio`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Studio Apartments</Link></li>
                                                                    <li><Link to={`/footerFAQ/${city.location}/residential`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Residential</Link></li>
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-center">
                                                                    <li><Link to={`/addLocation/${city.location}/New Projects`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i>New Projects</Link></li>
                                                                    <li><Link to={`/addLocation/${city.location}/Commercial`} className="btn btn-success btn-xs"><i className="fa fa-edit"></i>Commercial</Link></li>
                                                                    <li><Link to={`/addLocation/${city.location}/Flat`} className="btn btn-info btn-xs"><i className="fa fa-edit"></i>Flats</Link></li>
                                                                    <li><Link to={`/addLocation/${city.location}/Apartment`} className="btn btn-warning btn-xs"><i className="fa fa-edit"></i>Apartments</Link></li>
                                                                    <li><Link to={`/addLocation/${city.location}/studio`} className="btn btn-secondary btn-xs"><i className="fa fa-edit"></i>Studio Apartments</Link></li>
                                                                </ul>
                                                            </td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        {city.status === false ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(city._id, true)}>Deactive</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(city._id, false)}>Active</button>
                                                                        )}
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/addLocation/${city.location}/Common`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this city?')) {
                                                                                    handleDeleteCity(city._id);
                                                                                }
                                                                            }}
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
                                        </div> </div>
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
