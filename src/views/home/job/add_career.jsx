import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import ReactQuill from 'react-quill';
import useJobForm from './job_form'; 

const AddCareer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        formData,
        editorHtml,
        statusMessage,
        validationErrors,
        loading,
        handleInputChange,
        handleEditorChange,
        handleSubmit
    } = useJobForm(id);


    return (
        <div>
            <Sidebar />
            <div>
                <div className="midde_cont">
                    <div className="container-fluid">
                        <div className="row column_title">
                            <div className="col-md-12">
                                <div className="page_title">
                                    <h2>{id === 'add' ? 'Add' : 'Edit'} Career</h2>
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
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Title</label>
                                                    <input
                                                        type="text"
                                                        name="metaTitle"
                                                        className="form-control"
                                                        value={formData.metaTitle}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Meta Keyword</label>
                                                    <input
                                                        type="text"
                                                        name="metaKeyword"
                                                        className="form-control"
                                                        value={formData.metaKeyword}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Meta Description</label>
                                                    <textarea
                                                        rows={'5'}
                                                        name="metaDescription"
                                                        className="form-control"
                                                        value={formData.metaDescription}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">Position</label>
                                                    <input
                                                        type="text"
                                                        name="position"
                                                        className={`form-control ${validationErrors.position ? 'is-invalid' : ''}`}
                                                        value={formData.position}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.position && (
                                                            <div className="invalid-feedback">{validationErrors.position}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="label_field">NOS</label>
                                                    <input
                                                        type="number"
                                                        name="nos"
                                                        className={`form-control ${validationErrors.nos ? 'is-invalid' : ''}`}
                                                        value={formData.nos}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.nos && (
                                                            <div className="invalid-feedback">{validationErrors.nos}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Location</label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        className={`form-control ${validationErrors.location ? 'is-invalid' : ''}`}
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.location && (
                                                            <div className="invalid-feedback">{validationErrors.location}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Qualification</label>
                                                    <input
                                                        type="text"
                                                        name="qualification"
                                                        className={`form-control ${validationErrors.qualification ? 'is-invalid' : ''}`}
                                                        value={formData.qualification}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.qualification && (
                                                            <div className="invalid-feedback">{validationErrors.qualification}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label className="label_field">Min. Exp.</label>
                                                    <input
                                                        type="number"
                                                        name="min_exp"
                                                        className={`form-control ${validationErrors.min_exp ? 'is-invalid' : ''}`}
                                                        value={formData.min_exp}
                                                        onChange={handleInputChange}
                                                    />
                                                    {validationErrors.min_exp && (
                                                            <div className="invalid-feedback">{validationErrors.min_exp}</div>
                                                        )}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <label className="label_field">Description</label>
                                                    <ReactQuill
                                                        value={editorHtml}
                                                        onChange={handleEditorChange}
                                                        modules={AddCareer.modules}
                                                        formats={AddCareer.formats}
                                                        className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                                                    />
                                                    {validationErrors.description && (
                                                            <div className="invalid-feedback">{validationErrors.description}</div>
                                                        )}
                                                </div>
                                            </div>
                                            <div className="form-group margin_0">
                                                {id === 'add' ? ( 
                                                    <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>) : ( <button className="main_bt" type="submit" disabled={loading}>
                                                    {loading ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : (
                                                        'Update'
                                                    )}
                                                </button>)}
                                               
                                            </div>
                                            {/* <div className="form-group margin_0">
                                                
                                                <button className="main_bt" type="submit">{id === 'add' ? 'Submit' : 'Update'}</button>
                                            </div> */}
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
};

AddCareer.modules = {
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
        [{ 'emoji': [] }],  // Note: Quill does not support emoji out-of-the-box; this would require custom implementation or a plugin
    ],
};

AddCareer.formats = [
    'header', 'font', 'size',
    'list', 'bullet', 'indent', 'align',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'color', 'background',
    'link', 'image', 'video',
    'clean', 'script', 'direction', 'emoji',
];

export default AddCareer;
