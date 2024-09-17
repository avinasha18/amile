import React, { useEffect, useState } from "react";
import { Actions } from "../../hooks/actions";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Pagination,
  IconButton
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from "react-redux";
import { api } from "../../hooks/apis";
const MyReferals = () => {
  const [referals, setReferals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReferees, setTotalReferees] = useState(0); // State for total referees
  const { isDarkMode } = useTheme();
  const user = useSelector((state) => state.auth.user);
    console.log(user)
  useEffect(() => {
    fetchReferals(page);
  }, [page]);

  const fetchReferals = async (page) => {
    try {
      const response = await Actions.FetchMyReferals({ page });
      if (response.data.success) {
        setReferals(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalReferees(response.data.totalReferees); // Set total referees
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch referrals");
      setLoading(false);
    }
  };

  const shareMessage = "Your Friend Invited You To Join Amile for Jobs / Internships";
  const referralLink = `${window.location.origin}/signup?refrelid=${user}`;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Referral",
        text: shareMessage,
        url: referralLink,
      }).catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Your browser does not support the native sharing functionality.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            boxShadow: 3,
            bgcolor: isDarkMode ? '#000' : 'common.white',
            color: isDarkMode ? 'common.white' : 'common.black',
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center">
              Total Referrals
            </Typography>
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: isDarkMode ? 'blue.300' : 'blue.600',
              }}
            >
              {totalReferees || 0}
            </Typography>

            <Box className="text-center mt-4">
              <Typography>Refer Your Friends to Earn Badges</Typography>
              <Box className="flex justify-center mt-2">
                <IconButton
                  href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}%20${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  color="inherit"
                >
                  <WhatsAppIcon sx={{ color: isDarkMode ? "#25D366" : "#128C7E" }} />
                </IconButton>
                <IconButton
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareMessage)}`}
                  target="_blank"
                  color="inherit"
                >
                  <FacebookIcon sx={{ color: isDarkMode ? "#1877F2" : "#4267B2" }} />
                </IconButton>
                <IconButton
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  color="inherit"
                >
                  <TwitterIcon sx={{ color: isDarkMode ? "#1DA1F2" : "#1DA1F2" }} />
                </IconButton>
                <IconButton
                  href={`mailto:?subject=Join%20this%20awesome%20app&body=${encodeURIComponent(shareMessage)}%20${encodeURIComponent(referralLink)}`}
                  target="_blank"
                  color="inherit"
                >
                  <EmailIcon sx={{ color: isDarkMode ? "#D44638" : "#D44638" }} />
                </IconButton>
                <IconButton
                  onClick={handleNativeShare}
                  color="inherit"
                >
                  <ShareIcon sx={{ color: isDarkMode ? "common.white" : "common.black" }} />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card
          sx={{
            boxShadow: 3,
            bgcolor: isDarkMode ? '#000' : 'common.white',
            color: isDarkMode ? 'common.white' : 'common.black',
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Referred Users
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referals.length > 0 ? (
                    referals.map((referral) => (
                      <TableRow key={referral._id}>
                        <TableCell>{referral.username}</TableCell>
                        <TableCell>{referral.name || 'N/A'}</TableCell>
                        <TableCell>{referral.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No referrals found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MyReferals;
