import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLocationAdvantages } from '../../../../../../../api/location_advantages/location_advantages_api';
import { getProjectLocationAdvantages, ProjectLocationAdvantages } from '../../../../../../../api/dashboard/project_list/view_project/project_location_advantages_api';
import _ from 'lodash';

export default function AddProjectLocationAdvantages() {
    const [details, setDetails] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(new Set());
    const [textBoxValues, setTextBoxValues] = useState({});
    const [proximityUnits, setProximityUnits] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailsHandler(id);
    }, [id]);

    const fetchDetailsHandler = async (id) => {
        try {
            const Location = await getLocationAdvantages();
            setDetails(Location);
            
            const projectLocation = await getProjectLocationAdvantages(id);
            const trueStatusIds = projectLocation.data
                .filter(item => item.status)
                .map(item => item.LocationAdvantagesId);

            setSelectedLocation(new Set(trueStatusIds));

            // Initialize textBoxValues and proximityUnits from the existing projectLocation data
            const textBoxValues = {};
            const proximityUnits = {};

            projectLocation.data.forEach(item => {
                if (item.status) {
                    textBoxValues[item.LocationAdvantagesId] = {
                        title: item.title || '',
                        proximity: item.proximity || ''
                    };
                    proximityUnits[item.LocationAdvantagesId] = item.unit || '';
                }
            });

            setTextBoxValues(textBoxValues);
            setProximityUnits(proximityUnits);

        } catch (err) {
            console.error('Error fetching details:', err);
        }
    };

    const handleCheckboxChange = (locationId) => {
        setSelectedLocation((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            const newStatus = !updatedSelected.has(locationId);

            if (newStatus) {
                updatedSelected.add(locationId);
            } else {
                updatedSelected.delete(locationId);
            }

            // Update the state
            return updatedSelected;
        });
    };

    const handleTextBoxChange = (id, field, value) => {
        setTextBoxValues((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value
            }
        }));
    };

    const handleProximityUnitChange = (id, unit) => {
        setProximityUnits((prev) => ({
            ...prev,
            [id]: unit
        }));
    };

    const handleAddClick = async (locationId) => {
        const title = textBoxValues[locationId]?.title || '';
        const proximity = textBoxValues[locationId]?.proximity || '';
        const unit = proximityUnits[locationId] || '';
    
        if (!unit && proximity) {
            alert('Please select a proximity unit.');
            return;
        }

        if(!title) {
            alert("Title is mandatory");
            return;
        }
    
        try {
            const isExisting = selectedLocation.has(locationId);
            const response = await ProjectLocationAdvantages(locationId, isExisting, id, title, proximity, unit);
            console.log(response);
            alert(isExisting ? 'Data updated successfully.' : 'Data added successfully.');
        } catch (error) {
            console.error('Error adding/updating data:', error);
            alert('Failed to add/update data.');
        }
    };
    
    const isChecked = (locationId) => selectedLocation.has(locationId);

    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Project Location Advantages</h2>
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
                                    <div id="subct_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="full price_table padding_infor_info">
                                            <div className="row">
                                                {details.length === 0 ? (
                                                    <div className="col-lg-12 text-center">No Data Found</div>
                                                ) : (
                                                    details.map((detail) => (
                                                        detail.status === true ?
                                                        <div className="col-lg-2 mb-4" key={detail._id}>
                                                            <div className="card Location-card">
                                                                <img src={`https://star-estate-api.onrender.com/uploads/location_advantages/${detail.image}`} alt={detail.title} className="card-img-top" />
                                                                <div className="card-body">
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isChecked(detail._id)}
                                                                            onChange={() => handleCheckboxChange(detail._id)}
                                                                            className="mr-3"
                                                                        />
                                                                        <div>
                                                                            <h5 className="card-title mb-1">{detail.title}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer">
                                                                    <div className="form-group">
                                                                        <label htmlFor={`title-${detail._id}`}>Title:</label>
                                                                        <input
                                                                            type="text"
                                                                            id={`title-${detail._id}`}
                                                                            value={textBoxValues[detail._id]?.title || ''}
                                                                            onChange={(e) => handleTextBoxChange(detail._id, 'title', e.target.value)}
                                                                            disabled={!isChecked(detail._id)}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor={`proximity-${detail._id}`}>Proximity:</label>
                                                                        <input
                                                                            type="number"
                                                                            id={`proximity-${detail._id}`}
                                                                            value={textBoxValues[detail._id]?.proximity || ''}
                                                                            onChange={(e) => handleTextBoxChange(detail._id, 'proximity', e.target.value)}
                                                                            disabled={!isChecked(detail._id)}
                                                                            className="form-control"
                                                                        />
                                                                        <div className="form-check">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="d-flex align-items-center mr-4">
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={`km-${detail._id}`}
                                                                                        name={`proximity-unit-${detail._id}`}
                                                                                        value="km"
                                                                                        checked={proximityUnits[detail._id] === 'km'}
                                                                                        onChange={() => handleProximityUnitChange(detail._id, 'km')}
                                                                                        disabled={!isChecked(detail._id)}
                                                                                        className=""
                                                                                    />
                                                                                    <label htmlFor={`km-${detail._id}`} className="form-check-label ml-2">KM</label>
                                                                                </div>
                                                                                <div className="d-flex align-items-center mr-4">
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={`m-${detail._id}`}
                                                                                        name={`proximity-unit-${detail._id}`}
                                                                                        value="m"
                                                                                        checked={proximityUnits[detail._id] === 'm'}
                                                                                        onChange={() => handleProximityUnitChange(detail._id, 'm')}
                                                                                        disabled={!isChecked(detail._id)}
                                                                                        className=""
                                                                                    />
                                                                                    <label htmlFor={`m-${detail._id}`} className="form-check-label ml-2">M</label>
                                                                                </div>
                                                                                <div className="d-flex align-items-center mr-4">
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={`hr-${detail._id}`}
                                                                                        name={`proximity-unit-${detail._id}`}
                                                                                        value="hr"
                                                                                        checked={proximityUnits[detail._id] === 'hr'}
                                                                                        onChange={() => handleProximityUnitChange(detail._id, 'hr')}
                                                                                        disabled={!isChecked(detail._id)}
                                                                                        className=""
                                                                                    />
                                                                                    <label htmlFor={`hr-${detail._id}`} className="form-check-label ml-2">Hr</label>
                                                                                </div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <input
                                                                                        type="radio"
                                                                                        id={`min-${detail._id}`}
                                                                                        name={`proximity-unit-${detail._id}`}
                                                                                        value="min"
                                                                                        checked={proximityUnits[detail._id] === 'min'}
                                                                                        onChange={() => handleProximityUnitChange(detail._id, 'min')}
                                                                                        disabled={!isChecked(detail._id)}
                                                                                        className=""
                                                                                    />
                                                                                    <label htmlFor={`min-${detail._id}`} className="form-check-label ml-2">Min</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button 
                                                                            className="btn btn-secondary btn-xs float-right"
                                                                            onClick={() => handleAddClick(detail._id)}
                                                                            disabled={!isChecked(detail._id)}
                                                                        >
                                                                            {isChecked(detail._id) ? 'Update' : ''}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : ('')
                                                    ))
                                                )}
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
