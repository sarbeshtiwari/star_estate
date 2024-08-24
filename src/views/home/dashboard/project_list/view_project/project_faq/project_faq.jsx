import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchFAQs, updateFAQStatus, deleteFAQ } from '../../../../../../../api/dashboard/project_list/view_project/project_faq_api';

export default function ProjectFAQ() {
    
    const [faq, setFAQ] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch FAQs based on project ID
            fetchFAQsData(id);
        }
    }, [id]);

    const fetchFAQsData = async (projectId) => {
        try {
            const data = await fetchFAQs(projectId);
            setFAQ(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleStatusUpdate = async (faqId, status) => {
        try {
            await updateFAQStatus(faqId, status);
            // Refresh FAQs after update
            fetchFAQsData(id);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleFAQDelete = async (faqId) => {
        try {
            await deleteFAQ(faqId);
            // Refresh FAQs after delete
            fetchFAQsData(id);
        } catch (error) {
            console.error('Error deleting FAQ:', error);
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
                                    <h2>Project FAQs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to={`/${id}/addProjectFAQ/add`} className="btn btn-success btn-xs">Add FAQs</Link>
                                        <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div id="subct_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="table-responsive">
                                            <table className="table table-striped projects dataTable no-footer">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Question</th>
                                                        <th>Answers</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {faq.map((faqItem, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>{faqItem.faqQuestion}</td>
                                                            <td>{faqItem.faqAnswer}</td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        {faqItem.status === false ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleStatusUpdate(faqItem._id, true)}>Deactivate</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleStatusUpdate(faqItem._id, false)}>Active</button>
                                                                        )}
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/${id}/addProjectFAQ/${faqItem._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this FAQ?')) {
                                                                                    handleFAQDelete(faqItem._id);
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
    );
}
