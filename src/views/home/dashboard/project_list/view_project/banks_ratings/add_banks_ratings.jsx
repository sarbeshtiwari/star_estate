import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../../sidebar';
import { getBankList } from '../../../../../../../api/bank_list/bank_list_api';
import { addProjectBanksRatings, getProjectBanks, ProjectBanks } from '../../../../../../../api/dashboard/project_list/view_project/project_banks_api';
import _ from 'lodash';

export default function AddBanksandRatings() {
    const [details, setDetails] = useState([]);
    const [selectedbankList, setSelectedBankList] = useState(new Set());
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
     
        lifestyle: '',
        amenities: '',
        layout: '',
        connectivity: '',
        value_for_money: '',
    });

    useEffect(() => {
        fetchDetailsHandler(id);
    }, [id]);

    const fetchDetailsHandler = async (id) => {
        try {
            // Fetch all banks
            const data = await getBankList();
            setDetails(data);

            // Fetch project banks
            const projectBanks = await getProjectBanks(id);

            // Extract IDs with status true
            const trueStatusIds = projectBanks.data
                .filter(item => item.status)
                .map(item => item.BanksId);
            // Update selectedBanks based on the fetched Banks
            setSelectedBankList(new Set(trueStatusIds));
        } catch (err) {
            console.error('Error fetching details:', err);
        }
    };

    const handleChange = async (e) => {
        const { name, value} = e.target;

        // if (type === 'checkbox') {
        //     setFormData(prevFormData => ({
        //         ...prevFormData,
        //         banks: checked
        //             ? [...prevFormData.banks, value]
        //             : prevFormData.banks.filter(bank => bank !== value)
        //     }));
        // } else {
            setFormData({
                ...formData,
                [name]: value
            });
        // }
    };


    const handleCheckboxChange = (bankId) => {
        setSelectedBankList((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            const newStatus = !updatedSelected.has(bankId);

            if (newStatus) {
                updatedSelected.add(bankId);
            } else {
                updatedSelected.delete(bankId);
            }

            // Call debounced function
            debouncedStatus(bankId, newStatus, id);

            return updatedSelected;
        });
    };

    const debouncedStatus = _.debounce(async (bankId, status, id) => {
        try {
            const response = await ProjectBanks(bankId, status, id);
            console.log(response);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }, 300); // Adjust debounce delay as needed

    // Helper function to check if an bank is selected
    const isChecked = (bankId) => selectedbankList.has(bankId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
            const response = await addProjectBanksRatings(formData, id);
            if (response.success) {
                navigate(-1);
            }
        }catch(error){
            console.error(error)
        }
        // Add form submission logic here
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
                                    <h2>Add Banks & Ratings</h2>
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
                                        <form onSubmit={handleSubmit} id="submit" encType="multipart/form-data">
                                            <h2>Rating</h2>
                                            <div className="form-row">
                                                <div className="col-md-3 form-group">
                                                    <label className="label_field">Lifestyle</label>
                                                    <input
                                                        type="number"
                                                        name="lifestyle"
                                                        placeholder="eg: 80"
                                                        className="form-control"
                                                        value={formData.lifestyle}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-3 form-group">
                                                    <label className="label_field">Amenities</label>
                                                    <input
                                                        type="number"
                                                        name="amenities"
                                                        placeholder="eg: 80"
                                                        className="form-control"
                                                        value={formData.amenities}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-3 form-group">
                                                    <label className="label_field">Layout</label>
                                                    <input
                                                        type="number"
                                                        name="layout"
                                                        placeholder="eg: 80"
                                                        className="form-control"
                                                        value={formData.layout}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-3 form-group">
                                                    <label className="label_field">Connectivity</label>
                                                    <input
                                                        type="number"
                                                        name="connectivity"
                                                        placeholder="eg: 80"
                                                        className="form-control"
                                                        value={formData.connectivity}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-3 form-group">
                                                    <label className="label_field">Value for Money</label>
                                                    <input
                                                        type="number"
                                                        name="value_for_money"
                                                        placeholder="eg: 80"
                                                        className="form-control"
                                                        value={formData.value_for_money}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                <button type="submit" className="main_bt" id='submit'>Submit</button>
                                            </div>
                                            <span id="result" className="text-danger mt-4 d-block"></span>
                                            <div className="mb-4"><h2>Approved Banks</h2></div>
                                            <div className="row">
                                                {details.length === 0 ? (
                                                    <div className="col-lg-12 text-center">No Banks Found</div>
                                                ) : (
                                                    details.map((detail) => (
                                                        detail.status === true ?
                                                        <div className="col-lg-3 mb-4" key={detail._id}>
                                                            <div className="card amenity-card">
                                                                
                                                                <div className="card-body">
                                                                    <div className="d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            // name="banks"
                                                                            // value={detail._id} // Unique value for the checkbox
                                                                            checked={isChecked(detail._id)}
                                                                            onChange={() => handleCheckboxChange(detail._id)}
                                                                            className="mr-3"
                                                                        /><img src={`http://localhost:3017/uploads/banks_list/${detail.image}`} alt={detail.alt_tag} sizes='5'/>
                                                                        <div>
                                                                            <h5 className="card-title mb-1">{detail.title}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> : null
                                                    ))
                                                )}
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
