import Sidebar from "../sidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export default function LuxuryPropery(){
    const [luxury, setluxury] = useState([
        {
            id: 1,
            Name: 'Dinesh ',
            Email: 'dineshnegi777@yahoo.co.in',
            Mobile: '8920279367',
            Project_name: 'Godrej Golf Links',
            Query: 'gsdfgds',
            Note: 'hgfj',
            Created_at: '2024-07-23',
            
        },
        {
            id: 2,
            Name: 'imran',
            Email: 'imrankhan256768@gmail.com	',
            Mobile: '7453955006',
            Project_name: 'ATS Pious Orchards',
            Query: 'sdfsd',
            Note: 'aewrwe',
            Created_at: '2024-07-23',
           
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on the search query
  const filteredLuxury = luxury.filter(item =>
    item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Query.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const handleCopy = () => {
        const textToCopy = "Some text to copy"; // Replace with actual content
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    const downloadCSV = (data) => {
        const csvRows = [];
        // Adding headers
        csvRows.push(['No', 'Name', 'Email', 'Mobile', 'Project Name', 'Query', 'Note', 'Created at']); // Replace with actual headers

        // Adding data rows
        data.forEach((row, index) => {
            csvRows.push([index + 1, row.Name, row.Email, row.Mobile, row.Project_name, row.Query, row.Note, row.created_at]);
        });

        const csvString = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();

        URL.revokeObjectURL(url);
    };

    const downloadExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data, { header: ['No', 'Name', 'Email', 'Mobile', 'Project Name', 'Query', 'Note', 'Created at'] });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    const downloadPDF = (data) => {
        const doc = new jsPDF();
        doc.text("PDF content here", 10, 10); // Customize as needed
        data.forEach((item, index) => {
            doc.text(`${index + 1}: ${item.Name}, ${item.Email}, ${item.Mobile}, ${item.Project_name}, ${item.Query}, ${item.Note}, ${item.Created_at}`, 10, 20 + index * 10);
        });
        doc.save('data.pdf');
    };
   

    return (
    <>
    <div >
        <Sidebar />
        <div>
            <div className="midde_cont">
                <div className="container-fluid">
                    <div className="row column_title">
                        <div className="col-md-12">
                            <div className="page_title">
                                <h2>Luxury Property Show Queries</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row column1">
                        <div className="col-md-12">
                            <div className="white_shd full margin_bottom_30">
                                <div className="full price_table padding_infor_info">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="table-responsive-sm">
                                                {/* <table border="0" cellSpacing="5" cellPadding="5">
                                                    <tbody>
                                                        <tr>
                                                            <td>Start date:</td>
                                                            <td><input type="text" id="min" name="min" autoComplete="off"/></td>
                                                        </tr>
                                                        <tr>
                                                            <td>End date:</td>
                                                            <td><input type="text" id="max" name="max" autoComplete="off"/></td>
                                                        </tr>
                                                    </tbody>
                                                </table> */}
                                                <div id="pjdataTable_wrapper" className="dataTables_wrapper no-footer">
                                                <div className="dt-buttons">
                                                        <button 
                                                            className="dt-button buttons-copy buttons-html5" 
                                                            type="button" 
                                                            onClick={handleCopy}
                                                        >
                                                            <span>Copy</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-excel buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadExcel(luxury)}
                                                        >
                                                            <span>Excel</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-csv buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadCSV(luxury)}
                                                        >
                                                            <span>CSV</span>
                                                        </button>
                                                        <button 
                                                            className="dt-button buttons-pdf buttons-html5" 
                                                            type="button" 
                                                            onClick={() => downloadPDF(luxury)}
                                                        >
                                                            <span>PDF</span>
                                                        </button>
                                                    </div>
                                                    <div id="pjdataTable_filter" className="dataTables_filter">
                                                        <label>Search:
                                                        <input
                                                            type="search"
                                                            className=""
                                                            placeholder=""
                                                            aria-controls="pjdataTable"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                        />
                                                        </label>
                                                    </div>
                                                    <table id="pjdataTable" className="table table-striped projects display dataTable no-footer" style={{width: "100%"}} aria-describedby="pjdataTable_info">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th className="sorting sorting_asc" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" style={{width: "19px"}}>
                                                                    No

                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Name: activate to sort column ascending" style={{width: "56px"}}>
                                                                    Name

                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Email: activate to sort column ascending" style={{width: "266px"}}>
                                                                    Email
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Mobile: activate to sort column ascending" style={{width: "68px"}}>
                                                                    Mobile
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Project Name: activate to sort column ascending" style={{width: "94px"}}>
                                                                    Project Name
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Query: activate to sort column ascending" style={{width: "43px"}}>
                                                                    Query
                                                                </th>
                                                                <th width="16%" className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Start date: activate to sort column ascending" style={{width: "69px"}}>
                                                                    Start date
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="pjdataTable" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{width: "44px"}}>
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredLuxury.map((luxury, index) => (
                                                                <tr key={luxury.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        {custom_echo(luxury.Name, 20)}
                                                                    </td>
                                                                    <td>{custom_echo(luxury.Email, 20)}</td>
                                                                    <td>{custom_echo(luxury.Mobile, 20)}</td>
                                                                    <td>{custom_echo(luxury.Project_name, 20)}</td>
                                                                    <td>{custom_echo(luxury.Query, 20)}</td>
                                                                    <td>{luxury.Created_at}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                           
                                                                           
                                                                            
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this luxury?')) {
                                                                                            deleteluxury(luxury.id, luxury.image);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            ))}
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
    </>
    )

    
}

// Function to truncate text
function custom_echo(x, length) {
    return x.length <= length ? x : `${x.substr(0, length)}...`;
}