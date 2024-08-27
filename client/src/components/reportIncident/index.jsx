import { Box, Container, CssBaseline, Typography, Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Actions } from '../../hooks/actions';

const ReportIncident = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [reportStatus, setReportStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = params.get('token');

  useEffect(() => {
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    const reportIncident = async () => {
      try {
        const response = await Actions.reportIncident({ token });
        if (response.data.success) {
          setReportStatus('Incident reported successfully.');
          navigate('/', { replace: true });
        } else {
          setReportStatus(response.data?.message);
        }
      } catch (error) {
        setReportStatus('An error occurred while reporting the incident.');
      } finally {
        setLoading(false);
      }
    };

    reportIncident();
  }, [token, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[5],
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Report an Incident
        </Typography>
        {loading ? (
          <CircularProgress sx={{ marginTop: 2 }} />
        ) : (
          reportStatus && (
            <Alert severity={reportStatus.includes('success') ? 'success' : 'error'} sx={{ marginTop: 2 }}>
              {reportStatus}
            </Alert>
          )
        )}
      </Box>
    </Container>
  );
};

export default ReportIncident;
