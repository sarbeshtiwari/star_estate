import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchDetailById, addProjectSpecifications, updateProjectSpecifications } from '../../../../../../../api/dashboard/project_list/view_project/project_specification_api';

const AddProjectSpecification = () => {
    const { ids, id } = useParams();
    const [headings, setHeadings] = useState([{ title: '', value: '', projectname: id }]); // Initialize with one entry
   
    const navigate = useNavigate();

    useEffect(() => {
        if (ids !== 'add') {
            fetchDetail(ids);
        }
    }, [ids, id]); // id and ids are dependencies

    const fetchDetail = async (detailId) => {
        try {
            const data = await fetchDetailById(detailId);
            if (data.length === 0) {
                setHeadings([{ title: '', value: '', projectname: id }]);
            } else {
                setHeadings(data);
            }
        } catch (error) {
            console.error('Error fetching detail:', error);
            setHeadings([{ title: '', value: '', projectname: id }]);
        }
    };

    const addMoreFields = () => {
        setHeadings([...headings, { title: '', value: '', projectname: id }]);
    };

    const removeField = (index) => {
        if (headings.length > 1) { // Prevent removing all fields
            const updatedHeadings = [...headings];
            updatedHeadings.splice(index, 1);
            setHeadings(updatedHeadings);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedHeadings = [...headings];
        updatedHeadings[index] = {
            ...updatedHeadings[index],
            [name]: value
        };
        setHeadings(updatedHeadings);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;

            if (ids !== 'add') {
                // Update existing specifications
                response = await updateProjectSpecifications(id, headings);
            } else {
                // Add new specifications
                response = await addProjectSpecifications(headings);
            }

            if (response && response.success) {
                alert('Data saved successfully');
                navigate(-1);
            } else {
                alert(`Failed to save data: ${response.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving data. Please check the console for more details.');
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
                                    <h2>{ids === 'add' ? 'Add Project Specification' : "Edit Project Specification"}</h2>
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
                                        <form onSubmit={handleSubmit} id="specificationForm">
                                            <div className="more_fields_container">
                                                {headings.map((heading, index) => (
                                                    <div className="clone_fields" key={index}>
                                                        <div className="col-md-6 form-group remove">
                                                            {headings.length > 1 && (
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
                                                                    value={heading.title}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Value</label>
                                                                <input
                                                                    type="text"
                                                                    name="value"
                                                                    value={heading.value}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {ids === 'add' ? (<span onClick={addMoreFields} className="col-md-12 form-group add-more-link">Add More</span>) : ('')}
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt">Submit</button>
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
};

export default AddProjectSpecification;
