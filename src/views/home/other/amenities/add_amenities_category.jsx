import Sidebar from "../../sidebar";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { addAmenitiesCategory, getAmenitiesCategoriesByid, updateAmenitiesCategory } from "../../../../../api/amenities/amenities_category_api";

export default function AddAmenitiesCategory() {
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { id } = useParams(); // Get the ID from URL parameters

    useEffect(() => {
        if (id !== 'add') {
            fetchCategory(id);
        }
    }, [id]);

    const fetchCategory = async (id) => {
        try {
            let response;
            response = await getAmenitiesCategoriesByid(id);
            console.log(response)
            // await axios.get(`https://star-estate-api.onrender.com/amenities/getAmenitiyCategoriesByID/${id}`);
            setCategory(response.category || ''); 
        } catch (error) {
            console.error('Error fetching category:', error);
            setError('Failed to fetch category data.');
        }
    };

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    

    const validateForm = () => {
        const errors = {};
        if (!category) errors.category = 'Category is required';
        return errors;
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();



        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            let response;
            if (id === 'add') {
                response = await addAmenitiesCategory(category);
                //axios.post('http://localhost:1000/amenities/addAmenitiyCategory', { category });
                setSuccessMessage('Category added successfully');
            } else {
                response = await updateAmenitiesCategory(id, category);
                //axios.put(`http://localhost:1000/amenities/updateAmenitiyCategory/${id}`, { category });
                setSuccessMessage('Category updated successfully');
            }

            if (response.data.success) {
                alert('Data saved successfully');
               
                navigate(-1); // Navigate back after showing toast
            } else {
                setError(`Failed to save data: ${response.data.message}`);
            }
        } catch (error) {
            console.error('There was an error!', error);
            setError('An error occurred while processing the request');
        } finally {
            setLoading(false);
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
                                    <h2>{id === 'add' ? 'Add Amenities Category' : 'Edit Amenities Category'}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                    <button 
                                    className="btn btn-primary btn-xs float-right"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <form onSubmit={handleSubmit}>
                                            {error && <span className="status text-danger mb-0">{error}</span>}
                                            {successMessage && <span className="status text-success mb-0">{successMessage}</span>}
                                            <div className="form-row mb-3">
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Category</label>
                                                    <input
                                                        type="text"
                                                        name="category"
                                                        id="category"
                                                        value={category}
                                                        onChange={handleChange}
                                                        className={`form-control ${validationErrors.category ? 'is-invalid' : ''}`}
                                                    />
                                                    {validationErrors.category && (
                                                            <div className="invalid-feedback">{validationErrors.category}</div>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                {id === 'add' ? ( 
                                                    <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>) : ( <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>)}
                                               
                                            </div>
                                        </form>
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
