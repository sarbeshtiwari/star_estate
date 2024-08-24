// src/components/Blogs/Blogs.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link } from 'react-router-dom';
import { fetchBlogs, updateBlogStatus, deleteBlog } from '../../../../../api/blogs/blogs_api';
import image from '../../../../assets/images/logo.png';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const blogData = await fetchBlogs();
                setBlogs(blogData);
            } catch (err) {
                console.log('Failed to fetch data');
            }
        };

        loadBlogs();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            const response = await updateBlogStatus(id, status);
            if (response.success) {
                console.log('Blog status updated successfully!');
                setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === id ? { ...blog, status } : blog));
            } else {
                console.error('Error updating blog status:', response.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const handleDeleteBlog = async (id, image) => {
        try {
            await deleteBlog(id, image);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
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
                                    <h2>Blogs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addBlogs/add" className="btn btn-success btn-xs">Add Blogs</Link>
                                        <Link to="" className="btn btn-primary btn-xs float-right">Back</Link>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Blog Type</th>
                                                                <th>Blogs Image</th>
                                                                <th>Blogs Name</th>
                                                                <th>Blogs By</th>
                                                                <th>Blogs Desc</th>
                                                                <th>Blogs Date</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {blogs.map((blog, index) => (
                                                                <tr key={blog._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{blog.blogsCategory}</td>
                                                                    <td>
                                                                        <img 
                                                                            src={blog.blogsImage ? `https://star-estate-api.onrender.com/uploads/blogs/${blog.blogsImage}` : image} 
                                                                            className="rounded-circle" 
                                                                            style={{ objectFit: 'cover' }} 
                                                                            alt={blog.blogsImage} 
                                                                            width="50" 
                                                                            height="50" 
                                                                        />
                                                                    </td>
                                                                    <td>{blog.blogsName}</td>
                                                                    <td>{blog.blogsBy}</td>
                                                                    <td>{blog.content.slice(0, 20)}</td>
                                                                    <td>{blog.blogsDate}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {blog.status === false ? (
                                                                                    <button className="btn btn-warning btn-xs" onClick={() => handleUpdateStatus(blog._id, true)}>Deactive</button>
                                                                                ) : (
                                                                                    <button className="btn btn-success btn-xs" onClick={() => handleUpdateStatus(blog._id, false)}>Active</button>
                                                                                )}
                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/addBlogs/${blog._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this Blog?')) {
                                                                                            handleDeleteBlog(blog._id, blog.blogsImage);
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
        </div>
    );
}
