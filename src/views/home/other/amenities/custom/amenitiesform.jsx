import { useState, useEffect } from 'react';
import { fetchAmenityData, updateAmenityStatus, deleteAmenity } from '../../../../../../api/amenities/amenities_api'; 

const useAmenities = (id) => {
    const [amenities, setAmenities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAmenityData(id);
                if (data && Array.isArray(data.data)) {
                    setAmenities(data.data);
                } else {
                    setError('Unexpected data format.');
                }
            } catch (error) {
                setError('Failed to fetch amenities data.');
            }
        };

        fetchData();
    }, [id]);

    const handleUpdateStatus = async (cat_id, status) => {
        try {
            await updateAmenityStatus(cat_id, status);
            setAmenities(prevAmenities =>
                prevAmenities.map(amenity =>
                    amenity._id === cat_id ? { ...amenity, status } : amenity
                )
            );
        } catch (error) {
            setError('Failed to update amenity status.');
        }
    };

    const handleDeleteAmenity = async (cat_id) => {
        try {
            await deleteAmenity(cat_id);
            setAmenities(prevAmenities =>
                prevAmenities.filter(amenity => amenity._id !== cat_id)
            );
        } catch (error) {
            setError('Failed to delete amenity.');
        }
    };

    return {
        amenities,
        error,
        handleUpdateStatus,
        handleDeleteAmenity
    };
};

export default useAmenities;
