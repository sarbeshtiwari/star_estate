
import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import { fetchCategories, updateCategoryStatus, deleteCategory } from '../../../../api/category/category_api';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                // Display error message to users if needed
                console.error('Failed to fetch categories:', error);
            }
        };
        loadCategories();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            const result = await updateCategoryStatus(id, status);
            if (result.success) {
                setCategories((prevCategories) =>
                    prevCategories.map((cat) =>
                        cat._id === id ? { ...cat, status } : cat
                    )
                );
            } else {
                console.error('Failed to update status:', result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                alert("Category Deleted Successfully")
                setCategories((prevCategories) =>
                    prevCategories.filter((cat) => cat._id !== id)
                );
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
       <>
       <Sidebar/>
         <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Category</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to='/AddCategory/add' className="btn btn-success btn-xs">Add Category</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Category</th>
                                                                <th>Category URL</th>
                                                                <th>Added on</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {categories.map((category, index) => (
                                                                <tr key={category._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{category.category}</td>
                                                                    <td>{category.category}</td>
                                                                    <td>{category.category}</td>
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
                                                                                <Link to={`/AddCategory/${category._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button className="btn btn-danger btn-xs" onClick={() => handleDeleteCategory(category._id)}>
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
        </div></>
    );
};

export default Category;
