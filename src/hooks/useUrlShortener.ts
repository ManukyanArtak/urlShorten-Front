import { useState } from 'react';
import { createShortUrl } from '../services/urlService';

export const useUrlShortener = (onUrlCreated?: () => void) => {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleShorten = async () => {
        if (!url.trim()) return;

        try {
            setIsLoading(true);
            setError(null);
            
            const response = await createShortUrl(url.trim());
            
            setShortUrl(response.shortUrl);
            setCopied(false);
            
            if (onUrlCreated) {
                onUrlCreated();
            }
        } catch (err) {
            console.error('Error creating short URL:', err);
            setError('Failed to create short URL. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    };

    const handleReset = () => {
        setUrl('');
        setShortUrl('');
        setCopied(false);
        setError(null);
    };

    return {
        url,
        setUrl,
        shortUrl,
        copied,
        isLoading,
        error,
        handleShorten,
        handleCopy,
        handleReset,
    };
}; 