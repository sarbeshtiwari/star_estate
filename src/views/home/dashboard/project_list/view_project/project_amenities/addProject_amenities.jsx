import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllTheAmenities } from '../../../../../../../api/amenities/amenities_api';
import './amenities.module.css';
import { ProjectAmenities, getProjectAmenities } from '../../../../../../../api/dashboard/project_list/view_project/project_amenity_api';
import _ from 'lodash';

export default function AddProjectAmenities() {
    const [details, setDetails] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState(new Set()); // Set to manage selected amenities
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailsHandler(id);
    }, [id]);

    const fetchDetailsHandler = async (id) => {
        try {
            // Fetch all amenities
            const amenities = await getAllTheAmenities();
            setDetails(amenities);

            // Fetch project amenities
            const projectAmenities = await getProjectAmenities(id);

            // Extract IDs with status true
            const trueStatusIds = projectAmenities.data
                .filter(item => item.status)
                .map(item => item.amenityId);

            // Update selectedAmenities based on the fetched amenities
            setSelectedAmenities(new Set(trueStatusIds));
        } catch (err) {
            console.error('Error fetching details:', err);
        }
    };

    const handleCheckboxChange = (amenityId) => {
        setSelectedAmenities((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            const newStatus = !updatedSelected.has(amenityId);

            if (newStatus) {
                updatedSelected.add(amenityId);
            } else {
                updatedSelected.delete(amenityId);
            }

            // Call debounced function
            debouncedStatus(amenityId, newStatus, id);

            return updatedSelected;
        });
    };

    const debouncedStatus = _.debounce(async (amenityId, status, id) => {
        try {
            const response = await ProjectAmenities(amenityId, status, id);
            console.log(response);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }, 300); // Adjust debounce delay as needed

    // Helper function to check if an amenity is selected
    const isChecked = (amenityId) => selectedAmenities.has(amenityId);

    return (
        <div>
            <Sidebar />
            <div className="container-fluid">
                <div className="midde_cont">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h2>Project Amenities</h2>
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
                                                <div className="col-lg-12 text-center">No Amenities Found</div>
                                            ) : (
                                                details.map((detail) => (
                                                    detail.status === true ?
                                                    <div className="col-lg-4 mb-4" key={detail._id}>
                                                        <div className="card amenity-card">
                                                            <img src={`https://star-estate-api.onrender.com/uploads/amenities/${detail.image}`} alt={detail.title} className="card-img-top" />
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
                                                                        <p className="card-text mb-1">{detail.category}</p>
                                                                    </div>
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
    );
}
