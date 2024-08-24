import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../sidebar";
import {
    fetchProjectById,
    fetchCities,
    fetchDevelopers,
    fetchLocalitiesByCity,
    addProject,
    updateProject
} from '../../../../../api/dashboard/project_list/project_list_api'; 

export default function AddProject() {
    const { id, id1 } = useParams();
    const [cities, setCities] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [locality, setLocality] = useState([]);
   
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaKeyword: '',
        metaDescription: '',
        projectName: '',
        projectAddress: '',
        cityLocation: '',
        projectLocality: '',
        projectConfiguration: '',
        projectBy: '',
        projectType: '',
        projectPrice: '',
        ivr_no: '',
        locationMap: '',
        rera_no: '',
        city_priority: '',
        luxury_priority: '',
        newLaunch_priority: '',
        featured_priority: '',
        recent_priority: '',
        residential_priority: '',
        commercial_priority: '',
        project_status: [],
        project_logo: null,
        property_type: id1
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== 'add') {
            fetchProjectById(id).then(data => setFormData(data)).catch(console.error);
        }
        fetchCities().then(data => setCities(data)).catch(console.error);
        fetchDevelopers().then(data => setDevelopers(data)).catch(console.error);
    }, [id, id1]);

    const fetchLocalities = async (cityId) => {
        try {
            const data = await fetchLocalitiesByCity(cityId);
            if (data.length === 0) {
                alert("No data Found");
            }
            setLocality(data);
        } catch (error) {
            console.error('Error fetching localities:', error);
        }
    };

    const handleChange = async (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                project_status: checked
                    ? [...formData.project_status, value]
                    : formData.project_status.filter(status => status !== value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            if (name === 'cityLocation' && value) {
                await fetchLocalities(value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id === 'add') {
                await addProject(formData);
            } else {
                await updateProject(id, formData);
            }
            alert('Project saved successfully!');
            navigate(-1); // Redirect or clear form as needed
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save project');
        }
    };
    

    return(
        
            <div id="">
                <Sidebar/>
                <div className="midde_cont">
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>{id === 'add' ? 'Add' : 'Edit'} Overview</h2>
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
                                <form method="POST" id="projectsforms" encType="multipart/form-data" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-6 form-group">
                                            <label className="label_field">Meta Title</label>
                                            <input
                                                type="text"
                                                name="metaTitle"
                                                placeholder="Meta Title"
                                                className="form-control"
                                                value={formData.metaTitle}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="label_field">Meta Keyword</label>
                                            <input
                                                type="text"
                                                name="metaKeyword"
                                                placeholder="Meta Keyword"
                                                className="form-control"
                                                value={formData.metaKeyword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <label className="label_field">Meta Description</label>
                                            <textarea
                                                name="metaDescription"
                                                className="form-control"
                                                placeholder="Meta Description"
                                                rows="5"
                                                value={formData.metaDescription}
                                                onChange={handleChange}
                                            ></textarea>
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Name</label>
                                            <input
                                                type="text"
                                                name="projectName"
                                                placeholder="Project Name"
                                                className="form-control"
                                                value={formData.projectName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Address</label>
                                            <input
                                                type="text"
                                                name="projectAddress"
                                                placeholder="Project Address"
                                                className="form-control"
                                                value={formData.projectAddress}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">City</label>
                                            <select
                                                name="cityLocation"
                                                className="form-control"
                                                value={formData.cityLocation}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select City</option>
                                                {cities.map(city => (
                                                    <option key={city._id} value={city.location}>{city.location}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Locality</label>
                                            <select
                                                name="projectLocality"
                                                className="form-control"
                                                value={formData.projectLocality}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Locality</option>
                                                {locality.map(locality => (
                                                    <option key={locality._id} value={locality.sub_city}>{locality.sub_city}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Configuration</label>
                                            <input
                                                type="text"
                                                name="projectConfiguration"
                                                placeholder="3 &amp; 4 BHK"
                                                className="form-control"
                                                value={formData.projectConfiguration}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project BY</label>
                                            <select
                                                name="projectBy"
                                                className="form-control"
                                                value={formData.projectBy}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Developer</option>
                                                {developers.map(developers => (
                                                    <option key={developers._id} value={developers.developersName}>{developers.developerName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Type</label>
                                            <input
                                                type="text"
                                                name="projectType"
                                                placeholder="Ex - Independent Floor"
                                                className="form-control"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Price</label>
                                            <input
                                                type="text"
                                                name="projectPrice"
                                                placeholder="Ex - 4 Cr/Lakhs/K"
                                                className="form-control"
                                                value={formData.projectPrice}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">IVR Number</label>
                                            <input
                                                type="text"
                                                name="ivr_no"
                                                placeholder="Ex - 9800000000"
                                                className="form-control"
                                                value={formData.ivr_no}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Google Map Location</label>
                                            <input
                                                type="text"
                                                name="locationMap"
                                                placeholder="Ex - https://goo.gl/maps/8HFai3e5fxvCc5Q78"
                                                className="form-control"
                                                value={formData.locationMap}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">RERA No.</label>
                                            <input
                                                type="text"
                                                name="rera_no"
                                                placeholder="Ex -XXXXXXXXXXX"
                                                className="form-control"
                                                value={formData.rera_no}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">City Priority</label>
                                            <input
                                                type="number"
                                                name="city_priority"
                                                placeholder="Ex - 1   Only Numeric Value"
                                                className="form-control"
                                                value={formData.city_priority}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Luxury Priority</label>
                                            <input
                                                type="number"
                                                name="luxury_priority"
                                                placeholder="Ex - 1   Only Numeric Value"
                                                className="form-control"
                                                value={formData.luxury_priority}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">New Launch Priority</label>
                                            <input
                                                type="number"
                                                name="newLaunch_priority"
                                                value={formData.newLaunch_priority}
                                                placeholder="Ex - 1   Only Numeric Value"
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Featured Priority</label>
                                            <input
                                                type="number"
                                                name="featured_priority"
                                                value={formData.featured_priority}
                                                placeholder="Ex - 1   Only Numeric Value"
                                                onChange={handleChange}className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Recent Priority</label>
                                            <input
                                                type="number"
                                                name="recent_priority"
                                                value={formData.recent_priority}
                                                className="form-control"
                                                placeholder="Ex - 1   Only Numeric Value"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Residential</label>
                                            <input
                                                type="number"
                                                name="residential_priority"
                                                value={formData.residential_priority}
                                               className="form-control"
                                                placeholder="Ex - 1   Only Numeric Value"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Commercial</label>
                                            <input
                                                type="number"
                                                name="commercial_priority"
                                                value={formData.commercial_priority}
                                              className="form-control"
                                                placeholder="Ex - 1   Only Numeric Value"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3 form-group">
                                            <label className="label_field">Project Status</label>
                                            <div>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="project_status"
                                                        value="New Launch"
                                                        checked={formData.project_status.includes('New Launch')}
                                                        onChange={handleChange} 
                                                    /> New Launch
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="project_status"
                                                        value="Luxury"
                                                        checked={formData.project_status.includes('Luxury')}
                                                        onChange={handleChange}
                                                    /> Luxury
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="project_status"
                                                        value="Featured"
                                                        checked={formData.project_status.includes('Featured')}
                                                        onChange={handleChange}
                                                    /> Featured
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="project_status"
                                                        value="Recent"
                                                        checked={formData.project_status.includes('Recent')}
                                                        onChange={handleChange}
                                                    /> Recent
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <label className="label_field">Project Logo</label>
                                            <input
                                                type="file"
                                                name="project_logo"
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <button type="submit" className="main_bt">{id === 'add' ? 'Submit' : 'Update'}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                </div>
               
    )
}