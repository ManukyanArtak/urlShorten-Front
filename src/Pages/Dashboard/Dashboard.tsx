import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    IconButton,
    Tooltip
} from "@mui/material";
import { ContentCopy, OpenInNew } from '@mui/icons-material';
import AddUrlModal from "./components/AddUrlModal";
import { useAuth } from '../../components/Context/AuthContext';
import { useUrls } from '../../hooks/useUrls';



export default function ButtonAppBar() {
  const { logout } = useAuth();
  const { urls, isLoading, error, fetchUrls } = useUrls();

  const handleCopyShortUrl = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleOpenLongUrl = (longUrl: string) => {
    window.open(longUrl, '_blank');
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"  sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Short Url Generator
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
          <Box p={5} sx={{ flexGrow: 1 }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="urls table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Long URL</TableCell>
                      <TableCell>Short URL</TableCell>
                      <TableCell align="right">Visits</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {urls.length ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No URLs found. Create your first short URL!
                        </TableCell>
                      </TableRow>
                    ) : (
                      urls.map((url) => (
                        <TableRow
                          key={url.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row" sx={{ maxWidth: 300 }}>
                            <Tooltip title={url.longUrl}>
                              <Typography
                                variant="body2"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  cursor: 'pointer'
                                }}
                                onClick={() => handleOpenLongUrl(url.longUrl)}
                              >
                                {url.longUrl}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {url.shortUrl}
                              </Typography>
                              <Tooltip title="Copy short URL">
                                <IconButton
                                  size="small"
                                  onClick={() => handleCopyShortUrl(url.shortUrl)}
                                >
                                  <ContentCopy fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="text.secondary">
                              {url.visits}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Open original URL">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenLongUrl(url.longUrl)}
                              >
                                <OpenInNew fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
                      )}
        </Box>
        <AddUrlModal onUrlCreated={fetchUrls}/>
      </Box>
  );
}
