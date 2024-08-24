import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Sidebar from '../../../../sidebar';
import ReactQuill from 'react-quill';
import { fetchContent, saveContentSEO } from '../../../../../../../api/dashboard/project_list/view_project/content_seo_api';

export default function AddContentSEO() {
    const { id, ids } = useParams();
    const [formData, setFormData] = useState({
        schema: '',
        projectname: id,
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editorHtml, setEditorHtml] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (ids !== 'add') {
            const getContent = async () => {
                try {
                    const data = await fetchContent(id);
                    setFormData({
                        schema: data[0].schema || '',
                        projectname: data[0].projectname || id,
                        description: data[0].description || ''
                    });
                    setEditorHtml(data[0].description || '');
                } catch (error) {
                    console.error('Error fetching details:', error);
                    setStatusMessage('Failed to fetch content. Please try again later.');
                }
            };

            getContent();
        }
    }, [id, ids]);

    const handleChange = (value) => {
        setEditorHtml(value);
        setFormData(prevData => ({
            ...prevData,
            description: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { schema, projectname, description } = formData;

        if (!projectname || !description) {
            setStatusMessage("Please fill out all required fields.");
            return;
        }

        try {
            const response = await saveContentSEO(ids, formData);
            const result = response.data;

            if (result.success) {
                setStatusMessage('ContentSEO saved successfully');
                navigate(-1);
            } else {
                setStatusMessage(`Failed to save ContentSEO: ${result.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatusMessage('Error submitting form. Please try again later.');
        }
    };

    return (
        <>
            <div >
                <Sidebar />
                <div >
                    <div className="midde_cont">
                        <div className="container-fluid">
                            <div className="row column_title">
                                <div className="col-md-12">
                                    <div className="page_title">
                                        <h2>{ids === 'add' ? 'Add' : 'Edit'} Overview</h2>
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
                                            <span className="status text-danger">{statusMessage}</span>
                                            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                                                <div className="form-row">
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Description*</label>
                                                        <ReactQuill
                                                            value={editorHtml}
                                                            onChange={handleChange}
                                                            modules={AddContentSEO.modules}
                                                            formats={AddContentSEO.formats}
                                                        />
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label_field">Schema</label>
                                                        <input
                                                            type="text"
                                                            name="schema"
                                                            className="form-control"
                                                            value={formData.schema}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group margin_0">
                                                    <button className="main_bt" type="submit">{ids === 'add' ? 'Submit' : 'Update'}</button>
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
        </>
    );
}

AddContentSEO.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }],
        [{ 'font': [] }],
        [{ 'size': ['small', 'medium', 'large', 'huge'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'direction': 'rtl' }],
    ],
};

AddContentSEO.formats = [
    'header', 'font', 'size',
    'list', 'bullet', 'indent', 'align',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'color', 'background',
    'link', 'image', 'video',
    'clean', 'script', 'direction', 'emoji',
];
