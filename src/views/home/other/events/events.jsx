import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar';
import GalleryModal from '../../../widgets/gallery_model';
import image from '../../../../assets/images/logo.png';
import { fetchEvents, updateEventStatus, deleteEvent } from '../../../../../api/events/events_api';

export default function Events() {
    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState([]);
    const [eventId, setEventId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchEvents();
                setEvent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    const openModal = (eventId) => {
        setShowModal(true);
        setEventId(eventId);
    };

    const closeModal = () => {
        setShowModal(false);
        fetchEvents(); // Refresh events after closing modal
    };

    const handleStatusUpdate = async (id, currentStatus) => {
        try {
            await updateEventStatus(id, !currentStatus);
            setEvent(prevEvents => 
                prevEvents.map(evt => evt._id === id ? { ...evt, status: !currentStatus } : evt)
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteEvent = async (id, image) => {
        if (window.confirm('Are you sure you want to delete this Event?')) {
            try {
                await deleteEvent(id, image);
                setEvent(prevEvents => prevEvents.filter(evt => evt._id !== id));
            } catch (error) {
                setError(error.message);
            }
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
                                    <h2>Events</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row column1">
                            <div className="col-md-12">
                                <div className="white_shd full margin_bottom_30">
                                    <div className="full graph_head">
                                        <Link to="/addEvents/add" className="btn btn-success btn-xs">Add Events</Link>
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
                                                                <th>Events Name</th>
                                                                <th>Add Events Gallery</th>
                                                                <th>Events Gallery</th>
                                                                <th>Events Date</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {event.map((evt, index) => (
                                                                <tr key={evt._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <img 
                                                                            src={evt.eventImage ? `https://star-estate-api.onrender.com/uploads/events/${evt.eventImage}` : image}
                                                                            className="rounded-circle"
                                                                            style={{ objectFit: 'cover' }}
                                                                            alt={evt.eventName}
                                                                            width="50"
                                                                            height="50"
                                                                        />
                                                                    </td>
                                                                    <td>{evt.eventName}</td>
                                                                    <td>
                                                                        <button className="btn btn-success btn-xs" onClick={() => openModal(evt._id)}>Add Events Gallery</button>
                                                                        <GalleryModal
                                                                            showModal={showModal && eventId === evt._id}
                                                                            handleClose={closeModal}
                                                                            eventId={eventId}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/eventsGallery/${evt._id}`} className="btn btn-success btn-xs">View Gallery</Link>
                                                                    </td>
                                                                    <td>{evt.eventDate}</td>
                                                                    <td>
                                                                        <ul className="list-inline d-flex justify-content-end">
                                                                            <li>
                                                                                <button
                                                                                    className={`btn btn-xs ${evt.status ? 'btn-success' : 'btn-warning'}`}
                                                                                    onClick={() => handleStatusUpdate(evt._id, evt.status)}
                                                                                >
                                                                                    {evt.status ? 'Active' : 'Deactive'}
                                                                                </button>
                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/addEvents/${evt._id}`} className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></Link>
                                                                            </li>
                                                                            <li>
                                                                                <button
                                                                                    className="btn btn-danger btn-xs"
                                                                                    onClick={() => handleDeleteEvent(evt._id, evt.eventImage)}
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
    );
}
