import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get current year

    return (
        <div className="container-fluid">
            <footer className="footer">
                <p>Copyright © {currentYear} Star Estate. All rights reserved.</p>
            </footer>
            {/* JavaScript files */}
            {/* <script src="assets/js/popper.min.js"></script>
            <script src="assets/js/bootstrap.min.js"></script>
            <script src="assets/js/animate.js"></script>
            <script src="assets/js/perfect-scrollbar.min.js"></script>
            <script src="assets/js/custom.js"></script> */}
        </div>
    );
};

export default Footer;
