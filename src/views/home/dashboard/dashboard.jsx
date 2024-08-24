
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
import { fetchCategories } from "../../../../api/category/category_api";
import loadingImage from '../../../assets/images/loading.gif';


export default function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
     
            try {
                
                const data = await fetchCategories();
                setCategories(data);
               
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching categories:', error);
             
            }
            setLoading(false);
        };

        getCategories();
    }, []); // Empty dependency array ensures this runs once on mount


    
    return ( 
        <>  {loading? (<div className="d-flex justify-content-center align-items-center vh-100">
            <img src={loadingImage} className="img-fluid"/>
        </div>) : ( 

            <div id="">
                <Sidebar/>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        {/* Total Projects */}
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <h3 className="text-info text-capitalize">Total Projects</h3>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            {categories.map((category, index) => (
                                                <div key={index} className="col-md-6 col-lg-3">
                                                {category.status === true ? (
                                                    <Link to={`ProjectType/${category.category}`}>
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                            <div>
                                                                {category.category === 'Commercial'? (
                                                                <>
                                                               <i className="fa fa-building orange_color"></i>
                                                                </>
                                                            ) : category.category === 'Residential'?  (
                                                                <>
                                                               <i className="fa fa-home blue1_color"></i>
                                                                </>
                                                            ) : category.category === 'Retail'? (
                                                                <><i className="fa fa-hotel red_color"></i></>
                                                            ) : (
                                                                <></>
                                                            )}
                                                                </div>

                                                            </div>
                                                            <div className="counter_no">
                                                                <div>
                                                                    <p className="total_no">{/* Render your report count here */}</p>
                                                                    <p className="head_couter">{category.category}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>) : ('')}
                                                    
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Total Leads */}
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <h3 className="text-info text-capitalize">Total Leads</h3>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            {categories.map((category, index) => (
                                                <div key={index} className="col-md-6 col-lg-3">
                                                     {category.status === true ? ( <Link to="">
                                                        <div className="full counter_section margin_bottom_30">
                                                            <div className="couter_icon">
                                                                <div>
                                                                {category.category === 'Commercial'? (
                                                                <>
                                                               <i className="fa fa-building orange_color"></i>
                                                                </>
                                                            ) : category.category === 'Residential'?  (
                                                                <>
                                                               <i className="fa fa-home blue1_color"></i>
                                                                </>
                                                            ) : category.category === 'Retail'? (
                                                                <><i className="fa fa-hotel red_color"></i></>
                                                            ) : (
                                                                <></>
                                                            )}
                                                                </div>
                                                            </div>
                                                            <div className="counter_no">
                                                                <div>
                                                                    <p className="total_no">{/* Render your report count here */}</p>
                                                                    <p className="head_couter">{category.category}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>) : ('') }
                                                   
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Latest Leads */}
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <h3 className="text-info text-capitalize">Latest Leads</h3>
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="subct" className="table table-striped projects">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>S. No.</th>
                                                                <th>Date</th>
                                                                <th>Residential Leads</th>
                                                                <th>Commercial Leads</th>
                                                                <th>Contact Us Leads</th>
                                                                <th>Career Leads</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>2024-07-23</td>
                                                                <td>15</td>
                                                                <td>10</td>
                                                                <td>8</td>
                                                                <td>5</td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>2024-07-22</td>
                                                                <td>20</td>
                                                                <td>12</td>
                                                                <td>6</td>
                                                                <td>7</td>
                                                            </tr>
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
            )}
            </>
    );
}
