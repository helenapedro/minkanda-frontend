import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';

const useFetchUserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const fetchedUser = await getCurrentUser();
                setUser(fetchedUser);
            } catch (err) {
                setError('Failed to fetch user details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return { user, loading, error, setError };
};

export default useFetchUserDetails;
