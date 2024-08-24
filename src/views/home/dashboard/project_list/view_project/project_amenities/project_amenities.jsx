import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchDetails } from '../../../../../../../api/dashboard/project_list/view_project/quick_details_api';
import { getProjectAmenities } from '../../../../../../../api/dashboard/project_list/view_project/project_amenity_api';
import { getAllTheAmenities } from '../../../../../../../api/amenities/amenities_api';

export default function ProjectAmenities() {
    const [details, setDetails] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetailsHandler();
    }, [id]);

    const fetchDetailsHandler = async () => {
        try {
            // Fetch project amenities
            const projectResponse = await getProjectAmenities(id);
            const projectAmenities = Array.isArray(projectResponse.data) ? projectResponse.data : [];
            
            // Filter amenities where status is true
            const activeAmenities = projectAmenities.filter(amenity => amenity.status === true);
            
            // Fetch all amenities
            const allAmenitiesResponse = await getAllTheAmenities();
            // const allAmenities = Array.isArray(allAmenitiesResponse.data) ? allAmenitiesResponse.data : [];

            // Map IDs of active amenities to their details from all amenities
            const amenitiesMap = new Map(allAmenitiesResponse.map(amenity => [amenity._id, amenity]));
            const matchedAmenities = activeAmenities.map(amenity => amenitiesMap.get(amenity.amenityId)).filter(Boolean);

            // Update state with matched amenities
            setDetails(activeAmenities);
            setAmenities(matchedAmenities);

        } catch (err) {
            console.error('Error fetching details:', err);
            setDetails([]);
            setAmenities([]);
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
                                    <h2>Project Amenities</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to={`/${id}/addProjectAmenities`} className="btn btn-success btn-xs">
                                            {details.length === 0 ? 'Add' : 'Edit'}
                                        </Link>
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
                                                <div className="col-lg-12">
                                                    <div className="table-responsive-sm">
                                                        <table id="subct" className="table table-striped projects">
                                                            <thead className="thead-dark">
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Category</th>
                                                                    <th>Icon</th>
                                                                    <th>Title</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {amenities.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="4" className="text-center">No Data Available</td>
                                                                    </tr>
                                                                ) : (
                                                                    amenities.map((amenity, index) => (
                                                                        <tr key={amenity._id} className={index % 2 === 0 ? 'even' : 'odd'}>
                                                                            <td className="sorting_1">{index + 1}</td>
                                                                            <td>{amenity.category}</td>
                                                                            <td>{amenity.image}</td>
                                                                            <td>{amenity.title}</td>
                                                                        </tr>
                                                                    ))
                                                                )}
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
        </div>
    );
}
