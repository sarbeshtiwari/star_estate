import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchDetail, addQuickDetails, updateQuickDetails } from '../../../../../../../api/dashboard/project_list/view_project/quick_details_api';

const AddQuickDetails = () => {
    const { ids, id } = useParams();
    const [headings, setHeadings] = useState([{ heading: '', data: '', projectname: id }]);
  
    const navigate = useNavigate();

    useEffect(() => {
        if (ids !== 'add') {
            fetchDetailHandler(ids);
        }
    }, [ids, id]);

    const fetchDetailHandler = async (detailId) => {
        try {
            const data = await fetchDetail(detailId);
            if (data.length === 0) {
                setHeadings([{ heading: '', data: '', projectname: id }]);
            } else {
                setHeadings(data);
            }
        } catch (error) {
            console.error('Error fetching detail:', error);
            setHeadings([{ heading: '', data: '', projectname: id }]);
        }
    };

    const addMoreFields = () => {
        setHeadings([...headings, { heading: '', data: '', projectname: id }]);
    };

    const removeField = (index) => {
        if (headings.length > 1) {
            const updatedHeadings = [...headings];
            updatedHeadings.splice(index, 1);
            setHeadings(updatedHeadings);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedHeadings = [...headings];
        updatedHeadings[index] = { ...updatedHeadings[index], [name]: value };
        setHeadings(updatedHeadings);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (ids !== 'add') {
                response = await updateQuickDetails(id, headings);
            } else {
                response = await addQuickDetails(headings);
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
                                    <h2>{ids === 'add' ? 'Add Quick Detail' : 'Edit Quick Detail'}</h2>
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
                                                            {headings.length > 1 && (
                                                                <span onClick={() => removeField(index)}>
                                                                    <i className="fa fa-times red_color" aria-hidden="true"></i>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="form-row">
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Heading</label>
                                                                <input
                                                                    type="text"
                                                                    name="heading"
                                                                    value={heading.heading}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Text</label>
                                                                <input
                                                                    type="text"
                                                                    name="data"
                                                                    value={heading.data}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {ids === 'add' ? (<><span onClick={addMoreFields} className="col-md-12 form-group add-more-link">Add More</span>
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt">Submit</button>
                                            </div></>): (<>
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt">Update</button>
                                            </div></>)}
                                            
                                            <span id="result" className="text-danger mt-4 d-block"></span>
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

export default AddQuickDetails;
