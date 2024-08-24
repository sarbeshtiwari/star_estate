import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const Overview = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;
  
  const { id } = useParams();
  const [editorHtml, setEditorHtml] = useState('');

  // Use useEffect to update editorHtml when description changes
  useEffect(() => {
    setEditorHtml(description);
  }, [description]);

  return (
    <div className="modal show" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden={!isOpen} style={{ display: 'block' }}>
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">{id}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h1>Overview</h1>
            <div>{editorHtml || 'No description available'}</div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
