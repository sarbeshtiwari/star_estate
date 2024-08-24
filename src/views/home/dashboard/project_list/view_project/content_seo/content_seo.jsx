import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Overview from './overview';
import { fetchDetails, updateStatus, deleteDetails } from '../../../../../../../api/dashboard/project_list/view_project/content_seo_api';

export default function ContentSEO() {
    const [details, setDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await fetchDetails(id);
                setDetails(data);
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        };

        getDetails();
    }, [id]);

    const openModal = (detail) => {
        setSelectedDetail(detail);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleUpdateStatus = async (detailId, status) => {
        try {
            const response = await updateStatus(detailId, status);
            if (response.success) {
                console.log('Details status updated successfully!');
                setDetails(prevDetails => 
                    prevDetails.map(detail =>
                        detail._id === detailId ? { ...detail, status } : detail
                    )
                );
            } else {
                console.error('Error updating Details status:', response.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteDetails = async (detailId) => {
        try {
            await deleteDetails(detailId);
            setDetails(prevDetails => prevDetails.filter(detail => detail._id !== detailId));
        } catch (error) {
            console.error('Error deleting Details:', error);
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
                                    <h2>Content & SEO</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        {details.length === 0 ? (
                                            <Link to={`/${id}/addContentSEO/add`} className="btn btn-success btn-xs">Add Overview</Link>
                                            
                                        ) : null}
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
                                                                    <th>Project Name</th>
                                                                    <th>Overview</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {details.map((detail, index) => (
                                                                    <tr key={detail._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                        <td className="sorting_1">{index + 1}</td>
                                                                        <td>{detail.projectname}</td>
                                                                        <td>
                                                                            <div>
                                                                                <button onClick={() => openModal(detail)} className="btn btn-success btn-xs">
                                                                                    Overview
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <ul className="list-inline d-flex justify-content-end">
                                                                                <li>
                                                                                    {detail.status === false ? (
                                                                                        <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(detail._id, true)}>Deactivate</button>
                                                                                    ) : (
                                                                                        <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(detail._id, false)}>Active</button>
                                                                                    )}
                                                                                </li>
                                                                                <li>
                                                                                    <Link to={`/${id}/addContentSEO/${detail._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                                </li>
                                                                                <li>
                                                                                    <button
                                                                                        className="btn btn-danger btn-xs"
                                                                                        onClick={() => {
                                                                                            if (window.confirm('Are you sure you want to delete this Detail?')) {
                                                                                                handleDeleteDetails(detail._id);
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
                <Overview 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    description={selectedDetail ? selectedDetail.description : ''} 
                />
            </div>
        </div>
    );
}
