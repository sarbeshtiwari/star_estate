// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/images/logo.png';

// export default function Sidebar() {
//     const [isElementOpen, setIsElementOpen] = useState(false);
//     const [isQueryOpen, setIsQueryOpen] = useState(false);
//     const [sidebarOpen, setSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     const toggleElementCollapse = () => {
//         setIsElementOpen(!isElementOpen);
//     };

//     const toggleQueryCollapse = () => {
//         setIsQueryOpen(!isQueryOpen);
//     };

//     return (
//         <>
//          <div className="topbar">
//                     <nav className="navbar navbar-expand-lg navbar-light">
//                         <div className="full">
//                             <button
//                                 type="button"
//                                 id="sidebarCollapse"
//                                 className="sidebar_toggle"
//                                 onClick={toggleSidebar}
//                                 aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
//                             >
//                                 <i className="fa fa-bars"></i>
//                             </button>
//                             <div className="right_topbar">
//                                 <div className="icon_info">
//                                     <ul className="user_profile_dd">
//                                         <li>
//                                             <Link 
//                                                 className="dropdown-toggle" 
//                                                 data-toggle="dropdown"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                             >
//                                                 <span className="name_user">Welcome </span>
//                                             </Link>
//                                             <div className="dropdown-menu">
//                                                 <Link className="dropdown-item" to="/userlists">
//                                                     <span>User List</span> <i className="fa fa-user"></i>
//                                                 </Link>
//                                                 <Link className="dropdown-item" to="/logout">
//                                                     <span>Log Out</span> <i className="fa fa-sign-out"></i>
//                                                 </Link>
//                                             </div>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//         <nav id="sidebar">
//             <div className="sidebar_blog_1">
//                 <div className="sidebar-header">
//                     <div className="logo_section">
//                         <Link to="/">
//                             <img className="logo_icon img-responsive" src={logo} alt="Logo" />
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="sidebar_user_info">
//                     <div className="icon_setting"></div>
//                     <div className="user_profle_side">
//                         <div className="user_img">
//                             <img className="img-responsive" src={logo} alt="User" />
//                         </div>
//                         <div className="user_info">
//                             <h6>Welcome</h6>
//                             <p>
//                                 <span className="online_animation"></span> Online
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="sidebar_blog_2">
//                 <h4>General</h4>
//                 <ul className="list-unstyled components">
//                     <li>
//                         <Link to="/dashboard">
//                             <i className="fa fa-map purple_color2"></i> <span>Dashboard</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/category">
//                             <i className="fa fa-files-o yellow_color"></i> <span>Category</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/luxuryProp">
//                             <i className="fa fa-files-o yellow_color"></i> <span>Luxury Property Show</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/jobPost">
//                             <i className="fa fa-files-o yellow_color"></i> <span>Job Post</span>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="#element" onClick={toggleElementCollapse} aria-expanded={isElementOpen} className="dropdown-toggle">
//                             <i className="fa fa-diamond purple_color"></i> 
//                             <span>Other</span>
//                         </Link>
//                         <ul className={`list-unstyled collapse ${isElementOpen ? 'show' : ''}`} id="element">
//                             <li><Link to="/amenities_category"> <span>Amenities</span></Link></li>
//                             <li><Link to="/category"> <span>Category</span></Link></li>
//                             <li><Link to="/location"> <span>Location</span></Link></li>
//                             <li><Link to="/locationAdvantages"> <span>Common Location Advantages</span></Link></li>
//                             <li><Link to="/approvedBanks"> <span>Approved Banks</span></Link></li>
//                             <li><Link to="/developer"> <span>Developer</span></Link></li>
//                             <li><Link to="/blogs"> <span>Blogs</span></Link></li>
//                             <li><Link to="/events"> <span>Events</span></Link></li>
//                             <li><Link to="/newsPaper"> <span>News Paper</span></Link></li>
//                         </ul>
//                     </li>
//                     <li>
//                         <Link to="#query" onClick={toggleQueryCollapse} aria-expanded={isQueryOpen} className="dropdown-toggle">
//                             <i className="fa fa-diamond purple_color"></i> 
//                             <span>Enquiry</span>
//                         </Link>
//                         <ul className={`list-unstyled collapse ${isQueryOpen ? 'show' : ''}`} id="query">
//                             <li><Link to="/ProjectQueries"> <span>Project Queries</span></Link></li>
//                             <li><Link to="/ContactUs"> <span>Contact US</span></Link></li>
//                             <li><Link to="/career"> <span>Career</span></Link></li>
//                         </ul>
//                     </li>
//                 </ul>
//             </div>
            
//         </nav>
//         </>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button, Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import Cookies from 'js-cookie';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [showEnquiry, setShowEnquiry] = useState(false);

    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [warningMessage, setWarningMessage] = useState('');
    
    const navigate = useNavigate();

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const toggleOther = () => setShowOther(!showOther);
    const toggleEnquiry = () => setShowEnquiry(!showEnquiry);

    // useEffect(() => {
    //     // Timer for session logout
    //     const countdown = setInterval(() => {
    //         setTimeLeft(prevTime => {
    //             if (prevTime <= 0) {
    //                 clearInterval(countdown);
    //                 alert('Your session has ended.');
    //                 handleLogout();
    //                 return 0;
    //             }
    //             if (prevTime <= 120) {
    //                 setWarningMessage('Your session will expire shortly!');
    //             }
    //             return prevTime - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(countdown);
    // }, []);

    const formatTime = (seconds) => {
        if (seconds <= 0) return '0m 0s';
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs}s`;
    };

    const handleLogout = () => {
        
        Cookies.remove('authToken');
        Cookies.remove('expiryTime');
        navigate('/', {replace: true});
    };

    return (
        <>
            <Navbar bg="rgb(233, 238, 234)" expand="lg" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                {/* <Navbar.Brand href="#home">
                    <img src={logo} alt="Logo" width="100" />
                </Navbar.Brand> */}
                
                <Button 
                    variant="secondary" 
                    onClick={toggleSidebar}
                    style={{ paddingLeft: '15px', paddingRight: '15px', backgroundColor: '#7EA700', 
                        borderColor: '#7EA700',
                        color: '#fff' }}
                >
                    {showSidebar ? '' : <i className='fa fa-bars fa-2x'></i>}
                </Button>
                {/* <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="Welcome" id="basic-nav-dropdown" >
                            <NavDropdown.Item as={Link} to="">
                                User List
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="">
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse> */}
            </Navbar>

            <Offcanvas show={showSidebar} onHide={toggleSidebar} className="bg-rgb(233, 238, 234) p-4" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={logo} alt="Logo" width="150" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/dashboard" className="flex-column">
                        <Nav.Link as={Link} to="/dashboard" 
                        // className="bg-primary text-white p-2 rounded mb-2"
                        style={{  backgroundColor: '#7EA700', 
                            borderColor: '#7EA700',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/category"  style={{  backgroundColor: '#7EA700', 
                            borderColor: '#7EA700',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Category
                        </Nav.Link>
                        <Nav.Link as={Link} to="/luxuryProp"  style={{  backgroundColor: '#7EA700', 
                            borderColor: '#7EA700',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Luxury Property Show
                        </Nav.Link>
                        <Nav.Link as={Link} to="/jobPost"  style={{  backgroundColor: '#7EA700', 
                            borderColor: '#7EA700',
                            color: '#fff',
                            borderRadius: 5,
                            marginBottom: 10
                         }}>
                            Job Post
                        </Nav.Link>
                        
                        <Nav.Item>
                            <Nav.Link 
                                onClick={toggleOther}
                                aria-controls="other-items"
                                aria-expanded={showOther}
                                style={{  backgroundColor: '#2F2F2F', 
                                    borderColor: '#7EA700',
                                    color: '#fff',
                                    borderRadius: 5,
                                    marginBottom: 10
                                 }}
                                // className="bg-secondary text-white p-2 rounded mb-1"
                            >
                                Other
                            </Nav.Link>
                            {showOther && (
                                <Nav className="flex-column bg-light p-2 rounded" id="other-items">
                                    <Nav.Link as={Link} to="/amenities_category" className="text-dark">
                                        Amenities
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/category" className="text-dark">
                                        Category
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/location" className="text-dark">
                                        Location
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/locationAdvantages" className="text-dark">
                                        Common Location Advantages
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/approvedBanks" className="text-dark">
                                        Approved Banks
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/developer" className="text-dark">
                                        Developer
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/blogs" className="text-dark">
                                        Blogs
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/events" className="text-dark">
                                        Events
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/newsPaper" className="text-dark">
                                        News Paper
                                    </Nav.Link>
                                </Nav>
                            )}
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link 
                                onClick={toggleEnquiry}
                                aria-controls="enquiry-items"
                                aria-expanded={showEnquiry}
                                style={{  backgroundColor: '#2F2F2F', 
                                    borderColor: '#7EA700',
                                    color: '#fff',
                                    borderRadius: 5,
                                    marginBottom: 10
                                 }}
                                // className="bg-secondary text-white p-2 rounded mb-2"
                            >
                                Enquiry
                            </Nav.Link>
                            {showEnquiry && (
                                <Nav className="flex-column bg-light p-2 rounded" id="enquiry-items">
                                    <Nav.Link as={Link} to="/ProjectQueries" className="text-dark">
                                        Project Queries
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/ContactUs" className="text-dark">
                                        Contact Us
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/career" className="text-dark">
                                        Career
                                    </Nav.Link>
                                </Nav>
                            )}
                        </Nav.Item>
                    </Nav>
                </Offcanvas.Body>
                <div className="mt-3 text-center">
                    <Button 
                        variant="danger" 
                        onClick={handleLogout}
                        className="mb-3"
                    >
                        Log Out
                    </Button>
                    <span className="text-danger">
                        {warningMessage && <p>{warningMessage}</p>}
                        Session expires in: {formatTime(timeLeft)}
                    </span>
                </div>
            </Offcanvas>
        </>
    );
}





