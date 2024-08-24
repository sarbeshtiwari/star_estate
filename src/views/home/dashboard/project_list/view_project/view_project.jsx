import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../../sidebar";
import axios from "axios";

export default function ViewProject(){
    const {id} = useParams();
 
    useEffect(() => {},[id]);

    return(
        <div >
            <Sidebar />
            <div id="">
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                
                                <div className="page_title">
                                    <h2>Projects Section</h2>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/quickDetails/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-list orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Quick Details</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/contentSEO/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-info-circle orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                            
                                                <p className="head_couter">Content &amp; SEO Data</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectAmenities/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-building orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                        
                                                <p className="head_couter">Amenities</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/floorPlan/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-ticket orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                            
                                                <p className="head_couter">Floor Plan</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectLocationAdvantages/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-map orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Location advantages</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectGallery/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-photo orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Gallery</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectFAQ/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-question orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                            
                                                <p className="head_couter">FAQs</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectRERA/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-info orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                            
                                                <p className="head_couter">RERA Details</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectSpecifications/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-server orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Project Specifications</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/brochureWalkthrough/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-book orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Brochure &amp; Walkthrough</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <Link to={`/projectBanksRatings/${id}`}>
                                    <div className="full counter_section margin_bottom_30">
                                        <div className="couter_icon">
                                            <div>
                                                <i className="fa fa-university orange_color"></i>
                                            </div>
                                        </div>
                                        <div className="counter_no">
                                            <div>
                                                
                                                <p className="head_couter">Approved Banks &amp; Rating</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
  
                </div>

            </div>
        </div>
    )
}