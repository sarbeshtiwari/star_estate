import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../sidebar';
import { Link } from 'react-router-dom';
import { deleteLocationAdvantages, getLocationAdvantages, updateLocationAdvantagesStatus } from '../../../../../api/location_advantages/location_advantages_api';

export default function LocationAdvantages(){
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    })

    const fetchData = async () => {
        try { 
            const response = await getLocationAdvantages();
            setData(response);
         }
         catch (error) {
            console.error(error);
         }
    }

    const handleupdateStatus = async (id, status) => {
        try {
            await updateLocationAdvantagesStatus(id, status);
            
                const data = await getLocationAdvantages();
                setData(data);
           
        } catch (error) {
            console.error('Unexpected error:', error.message);
        }
    };

    const handleDelete = async (id, image) => {
        if (window.confirm('Are you sure you want to delete this Data?')) {
            try {
                await deleteLocationAdvantages(id, image);
                const data = await getLocationAdvantages();
                setData(data);
            } catch (error) {
                console.error('Error deleting developer:', error.message);
            }
        }
    };

    return (
        <div >
            <Sidebar />
            <div >
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Location Advantages</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                <div className="full graph_head">
                        <Link to="/addLocationAdvantages/add" className="btn btn-success btn-xs">Add</Link>
                        
                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Icon</th>
                                                                <th>Title</th>
                                                                
                                                                <th>Alt</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            
                                                            {data.map((data, index) => (
                                                                <tr key={data._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <img src={`https://star-estate-api.onrender.com/uploads/location_advantages/${data.image}`} className="rounded-circle" style={{ objectFit: 'cover' }} alt={data.alt_tag} width="50" height="50" />
                                                                    </td>
                                                                    
                                                                    <td>{data.title}</td>
                                                                    
                                                                    <td>{data.alt_tag}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {data.status === true ? (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleupdateStatus(data._id, false)}>Active</button>
                                                                                ) : (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleupdateStatus(data._id, true)}>Deactive</button>
                                                                                )}
                                                                            </li>
                                                                           
                                                                            <li>
                                                                                <Link to={`/addLocationAdvantages/${data._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                       
                                                                                            handleDelete(data._id, data.image);
                                                                                      
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