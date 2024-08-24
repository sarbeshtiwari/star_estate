import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchFAQById, updateFAQ, addFAQs } from '../../../../../../../api/dashboard/project_list/view_project/project_faq_api';

const AddProjectFAQ = () => {
    const { ids, id } = useParams();
    const [faqType, setFaqType] = useState(''); 
    const [headings, setHeadings] = useState([{ faqType: '', faqQuestion: '', faqAnswer: '', projectname: id }]); 
    const navigate = useNavigate();

    useEffect(() => {
        if (ids !== 'add') {
            fetchFAQ(ids);
        }
    }, [ids, id]);

    const fetchFAQ = async (faqId) => {
        try {
            const data = await fetchFAQById(faqId);
            if (data.length === 0) {
                setHeadings([{ faqType: '', faqQuestion: '', faqAnswer: '', projectname: id }]);
            } else {
                setFaqType(data[0].faqType || '');
                setHeadings(data);
            }
        } catch (error) {
            setHeadings([{ faqType: '', faqQuestion: '', faqAnswer: '', projectname: id }]);
        }
    };

    const addMoreFields = () => {
        setHeadings([...headings, { faqType, faqQuestion: '', faqAnswer: '', projectname: id }]);
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
        updatedHeadings[index] = {
            ...updatedHeadings[index],
            [name]: value
        };
        setHeadings(updatedHeadings);
    };

    const handleFaqTypeChange = (e) => {
        const { value } = e.target;
        setFaqType(value);
        const updatedHeadings = headings.map(heading => ({
            ...heading,
            faqType: value
        }));
        setHeadings(updatedHeadings);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            let result;
    
            if (ids !== 'add') {
                result = await updateFAQ(id, headings);
            } else {
                result = await addFAQs(headings);
            }
    
            if (result.success) {
                alert('Data saved successfully');
                navigate(-1);
            } else {
                alert(`Failed to save data: ${result.message}`);
            }
        } catch (error) {
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
                                    <h2>{ids === 'add' ? 'Add FAQs' : 'Edit FAQs'}</h2>
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
                                        <span className="status text-danger"></span>
                                        <form onSubmit={handleSubmit} id="gallerImage" encType="multipart/form-data">
                                            <div className="form-row">
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">FAQs Type</label>
                                                    <select
                                                        name="faqType"
                                                        value={faqType}
                                                        onChange={handleFaqTypeChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="projects">Projects</option>
                                                        <option value="location">Location</option>
                                                        <option value="developer">Developer</option>
                                                        <option value="sub_city">Sub City</option>
                                                    </select>
                                                </div>
                                            </div>
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
                                                                <label className="label_field">Question</label>
                                                                <input
                                                                    type="text"
                                                                    name="faqQuestion"
                                                                    value={heading.faqQuestion}
                                                                    onChange={(e) => handleInputChange(e, index)}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="col-md-6 form-group">
                                                                <label className="label_field">Answer</label>
                                                                <input
                                                                    type="text"
                                                                    name="faqAnswer"
                                                                    value={heading.faqAnswer}
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
                                                <input type="hidden" name="Amenities" value="yes" />
                                                <input type="hidden" name="amcat" value="3" />
                                                <button type="submit" className="main_bt">Submit</button>
                                            </div></>) : (<>
                                            <div className="form-group margin_0">
                                                <input type="hidden" name="Amenities" value="yes" />
                                                <input type="hidden" name="amcat" value="3" />
                                                <button type="submit" className="main_bt">Update</button>
                                            </div></>) }
                                            
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

export default AddProjectFAQ;
