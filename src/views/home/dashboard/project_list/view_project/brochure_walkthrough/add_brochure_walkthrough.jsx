import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Sidebar from "../../../../sidebar";
import { addBrochure, getBrochureByID, updateBrochure } from "../../../../../../../api/dashboard/project_list/view_project/brochure_walkthrough_api";

export default function AddBrochureWalkthrough() {
    const {id, ids} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        brochure: null,
        walkthrough: '',
        projectname: id
    });

    const [status, setStatus] = useState('');


    useEffect(() => {
        console.log(ids)
        if (ids !== 'add') {
            fetchBrochureByID(ids);
        }
    },[id, ids])
    
    const fetchBrochureByID = async (ids) => {
        try {
            const data = await getBrochureByID(ids);
            setFormData(data);
        } catch (err) {
            console.error('Failed to fetch data:', err.message);
        }
    };
    

    const handleWalkthroughChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBrochureChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            brochure: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const data = new FormData();
        // for (const key in formData) {
        //     if (formData[key] !== null && formData[key] !== '') {
        //         data.append(key, formData[key]);
        //     }
        // }

        try {
            if (ids !== 'add') {
                await updateBrochure(ids, formData);
            } else {
                await addBrochure(id, formData);
            }
            navigate(-1);
        } catch (error) {
            console.error('Error:', error.message);
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
                            <h2>{ids === 'add' ? 'Add' : 'Edit'} Brochure & Walkthrough</h2>
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
                                {status && <span className="status text-danger">{status}</span>}
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="form-row">
                                        <div className="col-md-6 form-group">
                                            <label className="label_field">Walkthrough URL</label>
                                            <input 
                                                type="text" 
                                                name="walkthrough" 
                                                id="walkthrough" 
                                                value={formData.walkthrough} 
                                                onChange={handleWalkthroughChange} 
                                                className="form-control" 
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="label_field">Brochure</label>
                                            <input 
                                                type="file" 
                                                name="brochure" 
                                                id="brochure" 
                                                onChange={handleBrochureChange} 
                                                className="form-control" 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group margin_0">
                                        <button className="main_bt" type="submit">Submit</button>
                                    </div>
                                    <span id="result" className="text-danger mt-4 d-block">{status}</span>
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