import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../../sidebar';
import { addFloorPlan, getFloorPlanByID, updateFloorPlan } from '../../../../../../../api/dashboard/project_list/view_project/floor_plan_api';


const AddApprovedBanks = () => {
    const { ids, id} = useParams();
    const [headings, setHeadings] = useState([{ image: '', title: '', area: '', projectname: id}]);
   
    const navigate = useNavigate();

    useEffect(() => {
        if(ids !== 'add'){
            fetchData(ids);
        }
    },[ids, id])

    const fetchData = async (ids) => {
        try{
            const data = await getFloorPlanByID(ids);
            setHeadings([{ ...data}]);
        }catch{
            console.log('Error fetching data', error);
            setHeadings([{image: '', title: '', area: '', projectname: id}]);
        }
    }

    // Function to handle adding more fields
    const addMoreFields = () => {
        setHeadings([...headings, { image: '', title: '', area: '', projectname: id}]);
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

    // Function to handle form submission
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
            if (ids !== 'add') {
                response = await updateFloorPlan(ids, formData);
            } else {
                response = await addFloorPlan(formData);
            }
    
            if (response && response.success) {
                setTimeout(() => navigate(-1), 500);
            } else {
                
            }
        } catch (error) {
            console.error('Error:', error);
         
            
        }
    };

    return (
        <div>
            <Sidebar />
            <div >
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{ids === 'add' ? 'Add' : 'Edit'} Floor Plan</h2>
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
                                                                <label className="label_field">Area</label>
                                                                <input
                                                                    type="text"
                                                                    name="area"
                                                                    className="form-control"
                                                                    value={heading.area}
                                                                    onChange={(e) => handleHeadingChange(index, 'area', e.target.value)}
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
                                            {ids === 'add' ? (<><span onClick={addMoreFields} className="col-md-12 form-group">Add More</span>
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt">Submit</button>
                                            </div></>) : (<>
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

export default AddApprovedBanks;
