import React from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useUrlShortener } from '../../../../hooks/useUrlShortener';

interface UrlShortenerProps {
    onUrlCreated?: () => void;
}

export default function UrlShortener({ onUrlCreated }: UrlShortenerProps) {
    const {
        url,
        setUrl,
        shortUrl,
        copied,
        isLoading,
        error,
        handleShorten,
        handleCopy,
        handleReset,
    } = useUrlShortener(onUrlCreated);

    return (
        <Box >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                URL Shortener
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                Enter the URL to shorten
            </Typography>

            <TextField
                label="URL"
                variant="outlined"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/foo/bar/biz"
                sx={{ mb: 2 }}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                variant="contained"
                fullWidth
                onClick={handleShorten}
                disabled={!url.trim() || isLoading}
                sx={{ mb: 2 }}
            >
                {isLoading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Creating...
                    </>
                ) : (
                    'Shorten URL'
                )}
            </Button>

            {shortUrl && (
                <Box mt={3}>
                    <Typography color="success.main" sx={{ mb: 1 }}>
                        Success! Here's your short URL:
                    </Typography>

                    <TextField
                        fullWidth
                        value={shortUrl}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCopy}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mb: 2 }}
                    />

                    {copied && (
                        <Typography variant="caption" color="success.main" sx={{ display: 'block', mb: 2 }}>
                            Copied!
                        </Typography>
                    )}

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleReset}
                    >
                        Create Another URL
                    </Button>
                </Box>
            )}
        </Box>
    );
}
