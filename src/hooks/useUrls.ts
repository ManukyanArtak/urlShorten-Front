import { useState, useEffect } from 'react';
import { getUrls, ShortUrl } from '../services/urlService';

export const useUrls = () => {
    const [urls, setUrls] = useState<ShortUrl[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUrls = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getUrls();
            setUrls(response.urls);
        } catch (err) {
            console.error('Error fetching URLs:', err);
            setError('Failed to load URLs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    return {
        urls,
        isLoading,
        error,
        fetchUrls,
    };
}; 