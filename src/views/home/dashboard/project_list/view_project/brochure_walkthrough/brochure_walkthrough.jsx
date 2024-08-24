import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBrochure, updateStatus, deleteDetails } from '../../../../../../../api/dashboard/project_list/view_project/brochure_walkthrough_api';

export default function BrochureWalkthrough() {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        fetchDetailsHandler();
    }, [id]);

    const fetchDetailsHandler = async () => {
        try {
            const data = await getBrochure(id);
            setDetails(data);
        } catch (err) {
            console.error('Error fetching details:', err);
        }
    };

    const handleStatusUpdate = async (detailId, status) => {
        try {
            const response = await updateStatus(detailId, status);
            if (response.success) {
                fetchDetailsHandler();
            } else {
                console.error('Error updating status:', response.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (detailId) => {
        try {
            await deleteDetails(detailId);
            fetchDetailsHandler();
        } catch (error) {
            console.error('Error deleting detail:', error);
        }
    };

    const handleBrochureClick = (url) => {
        if (url) {
            const fileExtension = url.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                // Image
                window.open(url, '_blank');
            } else if (['pdf'].includes(fileExtension)) {
                // PDF
                window.open(url, '_blank');
            } else if (['doc', 'docx'].includes(fileExtension)) {
                // Document
                window.open(url, '_blank');
            } else {
                // Other file types or unknown
                window.open(url, '_blank');
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
                                    <h2>Brochure And Walkthrough</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        {details.length === 0 || details[0].status === false ? (<Link to={`/${id}/addBrochureWalkthrough/add`} className="btn btn-success btn-xs">Add Brochure And Walkthrough</Link>):
                                        ('')}
                                        
                                        <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div id="subct_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="full price_table padding_infor_info">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="table-responsive-sm">
                                                        <table id="subct" className="table table-striped projects">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Brochure</th>
                                                                    <th>Walkthrough</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {details.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="4" className="text-center">No Data Found</td>
                                                                    </tr>
                                                                ) : (
                                                                    details.map((detail, index) => (
                                                                        <tr key={detail._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                            <td className="sorting_1">{index + 1}</td>
                                                                            <td>
                                                                                <button 
                                                                                    className="btn btn-info btn-xs" 
                                                                                    onClick={() => handleBrochureClick(detail.brochure)}
                                                                                >
                                                                                    Open Brochure
                                                                                </button>
                                                                            </td>
                                                                            <td>
                                                                                <Link 
                                                                                    to={detail.walkthrough} 
                                                                                    target="_blank" 
                                                                                    rel="noopener noreferrer"
                                                                                    className="btn btn-primary btn-xs"
                                                                                >
                                                                                    Open Walkthrough
                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <ul className="list-inline d-flex justify-content-end">
                                                                                    <li>
                                                                                        {detail.status === false ? (
                                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleStatusUpdate(detail._id, true)}>Deactivate</button>
                                                                                        ) : (
                                                                                            <button className="btn btn-success btn-xs" onClick={() => handleStatusUpdate(detail._id, false)}>Activate</button>
                                                                                        )}
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link to={`/${id}/addBrochureWalkthrough/${detail._id}`} className="btn btn-primary btn-xs">
                                                                                            <i className="fa fa-edit"></i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <button
                                                                                            className="btn btn-danger btn-xs"
                                                                                            onClick={() => {
                                                                                                if (window.confirm('Are you sure you want to delete this Detail?')) {
                                                                                                    handleDelete(detail._id);
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <i className="fa fa-trash"></i>
                                                                                        </button>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    ))
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
        </div>
    );
}
