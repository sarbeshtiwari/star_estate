import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar';
import { Link, useParams } from 'react-router-dom';
import { fetchImages, updateImageStatus, deleteImage } from '../../../../../api/events/events_api'; // Adjust the path as needed
import GalleryModal from '../../../widgets/gallery_model';
import image from '../../../../assets/images/logo.png';

export default function EventsGallery() {
    const [showModal, setShowModal] = useState(false);
    const [eventId, setEventId] = useState('');
    const [images, setImages] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchImagesData(id);
        }
    }, [id]);

    const fetchImagesData = async (eventId) => {
        try {
            const response = await fetchImages(eventId);
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleUpdateStatus = async (imageId, status) => {
        try {
            await updateImageStatus(imageId, status);
            fetchImagesData(id);
        } catch (error) {
            console.log('Error updating image status:', error);
        }
    };

    const handleDeleteImage = async (imageId, imagePath) => {
        try {
            await deleteImage(imageId, imagePath);
            fetchImagesData(id);
        } catch (error) {
            console.log('Error deleting image:', error);
        }
    };

    const openModal = () => {
        setShowModal(true);
        setEventId(id);
    };

    const closeModal = () => {
        setShowModal(false);
        fetchImagesData(id);
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
                                    <h2>Events Gallery</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <button className="btn btn-success btn-xs" onClick={openModal}>Add Events Gallery</button>
                                        <GalleryModal
                                            showModal={showModal && eventId === id}
                                            handleClose={closeModal}
                                            eventId={eventId}
                                        />
                                    </div>
                                    <div className="full price_table padding_infor_info">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive-sm">
                                                    <table id="pjdataTable" className="table table-striped projects dataTable no-footer">
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Events Image</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {images.length > 0 ? images.map((image, index) => (
                                                                <tr key={image._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <img
                                                                            src={`https://star-estate-api.onrender.com/uploads/gallery_image${image.imagePath}`}
                                                                            className="rounded-circle"
                                                                            style={{ objectFit: 'cover' }}
                                                                            alt={`Image ${index + 1}`}
                                                                            width="50"
                                                                            height="50"
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                {image.status === false ? (
                                                                                    <button
                                                                                        className="btn btn-warning btn-xs"
                                                                                        onClick={() => handleUpdateStatus(image._id, true)}
                                                                                    >
                                                                                        Deactivate
                                                                                    </button>
                                                                                ) : (
                                                                                    <button
                                                                                        className="btn btn-success btn-xs"
                                                                                        onClick={() => handleUpdateStatus(image._id, false)}
                                                                                    >
                                                                                        Active
                                                                                    </button>
                                                                                )}
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => {
                                                                                        if (window.confirm('Are you sure you want to delete this image?')) {
                                                                                            handleDeleteImage(image._id, image.imagePath);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <i className="fa fa-trash"></i>
                                                                                </button>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan="3" className="text-center">No images found</td>
                                                                </tr>
                                                            )}
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
    );
}
