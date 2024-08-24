import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../../sidebar';
import { fetchFAQs, updateFAQStatus, deleteFAQ } from '../../../../../../api/location/footer_faq_api';

export default function FooterFAQ() {
    const [faq, setFAQ] = useState([]);

    const { city, projectType } = useParams();

    useEffect(() => {
        if (city && projectType) {
            fetchFAQsData(city, projectType);
        }
    }, [city, projectType]);

    const fetchFAQsData = async (city, projectType) => {
        try {
            const faqs = await fetchFAQs(city, projectType);
            setFAQ(faqs);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateFAQStatus(id, status);
            fetchFAQsData(city, projectType);  // Refresh FAQs after update
        } catch (error) {
            console.error('Error updating FAQ status:', error);
        }
    };

    const handleDeleteFAQ = async (id) => {
        try {
            await deleteFAQ(id);
            fetchFAQsData(city, projectType);  // Refresh FAQs after delete
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
                                    <h2>Footer FAQs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to={`/addFAQ/${city}/add`} className="btn btn-success btn-xs">Add FAQs</Link>
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
                                                    {faq.map((item, index) => (
                                                        <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>{item.faqQuestion}</td>
                                                            <td>{item.faqAnswer}</td>
                                                            <td>
                                                                <ul className="list-inline d-flex justify-content-end">
                                                                    <li>
                                                                        {item.status === false ? (
                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(item._id, true)}>Deactive</button>
                                                                        ) : (
                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(item._id, false)}>Active</button>
                                                                        )}
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/addFAQ/${city}/${item._id}`} className="btn btn-primary btn-xs">
                                                                            <i className="fa fa-edit"></i>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="btn btn-danger btn-xs"
                                                                            onClick={() => {
                                                                                if (window.confirm('Are you sure you want to delete this FAQ?')) {
                                                                                    handleDeleteFAQ(item._id);
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
