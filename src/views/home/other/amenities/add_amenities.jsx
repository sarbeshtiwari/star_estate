// src/components/AddAmenities/AddAmenities.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addSubAmenities, getSubAmenitiyByID, updateSubAmenity } from '../../../../../api/amenities/amenities_api';

const AddAmenities = () => {
    const { ids, id } = useParams(); // Assuming ids is the category
    const [headings, setHeadings] = useState([{ image: '', title: '', alt_tag: '', category: ids }]); // State to store dynamic inputs
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            // Fetch existing data if needed
            fetchData(id);
        }
    }, [ids, id]);

    const fetchData = async (id) => {
        try {
            const data = await getSubAmenitiyByID(id);
            // Ensure data is an array
        // if (Array.isArray(data)) {
            setHeadings([{ ...data, category: ids }]);
        // } else {
        //     console.error('Data fetched is not an array:', data);
        //     setHeadings(data);
        // }
        }catch (error){
            console.log('Error fetching data', error);
            setHeadings([{image: '', title: '', alt_tag: '', category: ids}]);
        }
    }

    // Function to handle adding more fields
    const addMoreFields = () => {
        setHeadings([...headings, { image: '', title: '', alt_tag: '', category: ids }]);
    };

    // Function to handle removing a field
    const removeField = (index) => {
        const updatedHeadings = [...headings];
        updatedHeadings.splice(index, 1);
        setHeadings(updatedHeadings);
    };

    // Function to handle input change for headings
    const handleHeadingChange = (index, field, value) => {
        const updatedHeadings = [...headings];
        if (field === 'image') {
            updatedHeadings[index] = { ...updatedHeadings[index], [field]: value[0] }; // Handle file input
        } else {
            updatedHeadings[index] = { ...updatedHeadings[index], [field]: value };
        }
        setHeadings(updatedHeadings);
    };

    const validateImage = (file) => {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg"];
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const arr = new Uint8Array(reader.result).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                let fileType = "";
                switch (header) {
                    case "89504e47":
                        fileType = "image/png";
                        break;
                    case "52494646":
                        fileType = "image/webp";
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        fileType = "image/jpeg";
                        break;
                    default:
                        fileType = "unknown";
                        break;
                }

                if (!allowedTypes.includes(fileType)) {
                    reject("Only JPG, JPEG, WEBP, and PNG formats are allowed.");
                } else {
                    resolve(file);
                }
            };

            reader.onerror = () => reject("Error reading file.");
            reader.readAsArrayBuffer(file);
        });
    };

    // Function to handle form submission
   // React component
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const formData = new FormData();

        // Append JSON data
        formData.append('data', JSON.stringify(headings));

        // Append image files
        headings.forEach((heading, index) => {
            if (heading.image) {
                formData.append(`image`, heading.image); // Append images with unique keys
            }
        });

        let response;
        if (id !== 'add') {
            response = await updateSubAmenity(id, formData);
        } else {
            response = await addSubAmenities(formData);
        }

        if (response && response.success) {
            setToastMessage('Data saved successfully');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
            setTimeout(() => navigate(-1), 2000);
        } else {
            setToastMessage(`Failed to save data: ${response.message}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
        }
    } catch (error) {
        console.error('Error:', error);
        setToastMessage('An error occurred while saving data.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
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
                                    <h2>Add Amenities</h2>
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
                                        <form onSubmit={handleSubmit} id="gallerImage" encType="multipart/form-data">
                                            <div className="more_fields_container">
                                                {headings.map((heading, index) => (
                                                    <div className="clone_fields" key={index}>
                                                        <div className="col-md-6 form-group remove">
                                                            {index > 0 && (
                                                                <span onClick={() => removeField(index)}>
                                                                    <i className="fa fa-times red_color" aria-hidden="true"></i>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Title</label>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    className="form-control"
                                                                    value={heading.title}
                                                                    onChange={(e) => handleHeadingChange(index, 'title', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Alt</label>
                                                                <input
                                                                    type="text"
                                                                    name="alt_tag"
                                                                    className="form-control"
                                                                    value={heading.alt_tag}
                                                                    onChange={(e) => handleHeadingChange(index, 'alt_tag', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-12 form-group">
                                                                <label className="label_field">Image</label>
                                                                <input
                                                                    type="file"
                                                                    name="image"
                                                                    className="form-control"
                                                                    onChange={(e) => handleHeadingChange(index, 'image', e.target.files)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {id === 'add' ? (<span onClick={addMoreFields} className="col-md-12 form-group">Add More</span>):('')}
                                            

                                            <div className="form-group margin_0">
                                                <input type="hidden" name="Amenities" value="yes" />
                                                <input type="hidden" name="amcat" value="3" />
                                                <button type="submit" className="main_bt"> {id === 'add' ? 'Submit' : 'Update'}</button>
                                            </div>
                                            <span id="result" className="text-danger mt-4 d-block"></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Toast Notification */}
                {showToast && (
                    <div className="toast-container position-fixed bottom-0 end-0 p-3">
                        <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Notification</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div className="toast-body">
                                {toastMessage}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAmenities;
