import React from 'react';
import Sidebar from '../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAmenities from './custom/amenitiesform'; 

export default function Amenities() {
    const { id } = useParams();
    const { amenities, error, handleUpdateStatus, handleDeleteAmenity } = useAmenities(id);
    const navigate = useNavigate();

    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Amenities</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to={`/addAmenities/${id}/add`} className="btn btn-success btn-xs">Add Amenities</Link>
                                        <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Icon</th>
                                                                <th>Title</th>
                                                                <th>Alt Tag</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {amenities.length > 0 ? amenities.map((amenity, index) => (
                                                                <tr key={amenity._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <img src={`https://star-estate-api.onrender.com/uploads/amenities/${amenity.image}`} className="rounded-circle" style={{ objectFit: 'cover' }} alt={amenity.alt_tag} width="50" height="50" />
                                                                    </td>
                                                                    <td>{amenity.title}</td>
                                                                    <td>{amenity.alt_tag}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {amenity.status === false ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(amenity._id, true)}>Deactive</button>
            
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(amenity._id, false)}>Active</button>
                                                                                )}
                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/addAmenities/${id}/${amenity._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this amenity?')) {
                                                                                            handleDeleteAmenity(amenity._id);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan="5">No amenities found.</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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
}
