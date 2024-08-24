// src/components/AmenitiesCategory/AmenitiesCategory.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { getAmenitiesCategories, updateCategoryStatus, deleteCategory } from '../../../../../api/amenities/amenities_category_api';

const AmenitiesCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getAmenitiesCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const result = await updateCategoryStatus(id, status);
            if (result.success) {
                console.log('Category status updated successfully!');
                fetchCategories();
            } else {
                console.error('Error updating category status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError('Failed to update category status.');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            alert('Data Deleted Successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            setError('Failed to delete category.');
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
                                    <h2>Amenities Category</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addAmenitiesCategory/add" className="btn btn-success btn-xs">Add</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        {loading ? (
                                            <div className="text-center">Loading...</div>
                                        ) : error ? (
                                            <div className="text-danger text-center">{error}</div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="table-responsive-sm">
                                                        <table id="subct" className="table table-striped projects">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Category</th>
                                                                    <th>Amenities</th>
                                                                    <th>Added on</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {categories.length > 0 ? (
                                                                    categories.map((category, index) => (
                                                                        <tr key={category._id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{category.category}</td>
                                                                            <td>
                                                                                <Link to={`/Amenities/${category.category}`} className="btn btn-success btn-xs">View</Link>
                                                                            </td>
                                                                            <td>{new Date(category.added_on).toLocaleDateString()}</td>
                                                                            <td>
                                                                                <ul className="list-inline d-flex justify-content-end">
                                                                                    <li>
                                                                                        {category.status === false ? (
                                                                                            <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(category._id, true)}>Deactive</button>
                                                                                        ) : (
                                                                                            <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(category._id, false)}>Active</button>
                                                                                        )}
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link to={`/addAmenitiesCategory/${category._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <button
                                                                                            className="btn btn-danger btn-xs"
                                                                                            onClick={() => {
                                                                                                if (window.confirm('Are you sure you want to delete this category?')) {
                                                                                                    handleDeleteCategory(category._id);
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
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="5" className="text-center">No categories found.</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmenitiesCategory;
