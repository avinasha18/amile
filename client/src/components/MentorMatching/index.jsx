import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Avatar,
  CircularProgress,
  Typography,
  Modal,
  Box,
  Paper,
  IconButton,
  Fade,
  useTheme as useMuiTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CloseIcon from '@mui/icons-material/Close';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import animationData1 from './animation.json';
import animationData2 from './animation2.json';
import animationData3 from './animation3.json';
import { useTheme } from '../../context/ThemeContext';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  borderRadius: 15,
  maxWidth: 400,
  textAlign: 'center',
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(4),
}));

const MentorCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 15,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const MentorMatching = () => {
  const [openModal, setOpenModal] = useState(true);
  const [stage, setStage] = useState('initial');
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [mentorMatched, setMentorMatched] = useState(false);

  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const studentId = Cookies.get('userId');
  const { isDarkMode } = useTheme();

  const dummyMentors = [
    {
      id: 1,
      name: "John Doe",
      profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      title: "Senior Software Engineer",
      email: "john.doe@example.com",
      qualifications: "BSc Computer Science, University of Tech (2015)",
      skills: ["JavaScript", "React", "Node.js", "Python", "Docker"],
      certifications: "Certified React Developer, React Academy",
      workExperience: "Software Engineer at Tech Company (3 years), Lead Developer at StartUp Inc. (2 years)",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      portfolio: "https://johndoe.dev"
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePictureUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      title: "Full Stack Developer",
      email: "jane.smith@example.com",
      qualifications: "MSc Software Engineering, Tech University (2018)",
      skills: ["Python", "Django", "React", "PostgreSQL", "AWS"],
      certifications: "AWS Certified Developer, Amazon Web Services",
      workExperience: "Full Stack Developer at Web Solutions Inc. (4 years), Software Architect at InnovateTech (2 years)",
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
      portfolio: "https://janesmith.dev"
    }
  ];

  useEffect(() => {
    const checkMentorNeeded = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student-mentor/${studentId}`);
        const data = response.data;
        if (!data.neededMentor) {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Error checking mentor needed:', error);
      }
    };

    checkMentorNeeded();
  }, [studentId, navigate]);

  const fetchMentor = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const randomMentor = dummyMentors[Math.floor(Math.random() * dummyMentors.length)];
      setMentor(randomMentor);
      setLoading(false);
      setStage('showMentor');
    }, 2000);
  }, []);

  const handleStartMatching = () => {
    setOpenModal(false);
    setStage('matching');
    setAnimationIndex(0);
    const interval = setInterval(() => {
      setAnimationIndex((prev) => {
        if (prev === 2) {
          clearInterval(interval);
          fetchMentor();
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const handleChooseMentor = async () => {
    try {
      // In a real application, you would make an API call here
      // await axios.post('http://localhost:3000/assign-mentor', {
      //   studentId,
      //   mentorId: mentor.id
      // });
      setMentorMatched(true);
    } catch (error) {
      console.error('Error assigning mentor:', error);
    }
  };

  const handleTryAnother = () => {
    setStage('matching');
    setAnimationIndex(0);
    handleStartMatching();
  };

  const animationOptions = (data) => ({
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  });

  const animations = [animationData1, animationData2, animationData3];
  const animationTexts = [
    "Searching for your perfect mentor...",
    "Analyzing your profile and preferences...",
    "Match found! Preparing to introduce you..."
  ];

  const TypedText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }, [text]);

    return <span>{displayText}</span>;
  };

  return (
    <div className="flex-grow bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <StyledModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <ModalContent>
            <IconButton
              aria-label="close"
              onClick={() => setOpenModal(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to find your perfect mentor?
            </Typography>
            <Typography variant="body1" paragraph>
              Our AI-powered system will match you with a mentor who can guide you on your learning journey.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartMatching}
              startIcon={<PersonSearchIcon />}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Start Matching
            </Button>
          </ModalContent>
        </Fade>
      </StyledModal>

      <AnimatePresence mode="wait">
        {stage === 'matching' && (
          <motion.div
            key="matching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center"
          >
            <AnimationContainer>
              <Lottie
                options={animationOptions(animations[animationIndex])}
                height={300}
                width={300}
              />
              <Typography variant="h5" className="mt-8 text-gray-800 font-semibold text-center">
                {animationTexts[animationIndex]}
              </Typography>
            </AnimationContainer>
          </motion.div>
        )}

        {stage === 'showMentor' && mentor && !mentorMatched && (
          <motion.div
            key="showMentor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="p-4 md:p-8"
          >
            <MentorCard elevation={3}>
              <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="center" mb={4}>
                <Avatar
                  src={mentor.profilePictureUrl}
                  alt={mentor.name}
                  sx={{ width: 120, height: 120, mb: isMobile ? 2 : 0, mr: isMobile ? 0 : 4 }}
                />
                <Box>
                  <Typography variant="h4" component="h2" gutterBottom>
                    <TypedText text={mentor.name} />
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    <TypedText text={mentor.title} />
                  </Typography>
                </Box>
              </Box>

              <InfoItem>
                <IconWrapper>
                  <EmojiPeopleIcon />
                </IconWrapper>
                <Typography variant="body1">
                  <TypedText text={mentor.email} />
                </Typography>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <SchoolIcon />
                </IconWrapper>
                <Typography variant="body1">
                  <TypedText text={mentor.qualifications} />
                </Typography>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <WorkIcon />
                </IconWrapper>
                <Typography variant="body1">
                  <TypedText text={mentor.workExperience} />
                </Typography>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <SchoolIcon />
                </IconWrapper>
                <Typography variant="body1">
                  <TypedText text={`Skills: ${mentor.skills.join(', ')}`} />
                </Typography>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <SchoolIcon />
                </IconWrapper>
                <Typography variant="body1">
                  <TypedText text={`Certifications: ${mentor.certifications}`} />
                </Typography>
              </InfoItem>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>Social Links</Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                  <IconButton color="primary" aria-label="github" component="a" href={mentor.github} target="_blank">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="linkedin" component="a" href={mentor.linkedin} target="_blank">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="portfolio" component="a" href={mentor.portfolio} target="_blank">
                    <LanguageIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box display="flex" justifyContent="center" mt={4} gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChooseMentor}
                  startIcon={<EmojiPeopleIcon />}
                >
                  Choose This Mentor
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleTryAnother}
                  startIcon={<PersonSearchIcon />}
                >
                  See Another Mentor
                </Button>
              </Box>
            </MentorCard>
          </motion.div>
        )}

        {mentorMatched && (
          <motion.div
            className="flex flex-col items-center justify-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AiOutlineCheckCircle size={100} color={isDarkMode ? 'white' : 'green'} />
            <Typography
              variant="h6"
              className="mt-4 text-center text-xl font-semibold"
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              Mentorship successfully assigned!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 mt-4 rounded-lg shadow-md"
            >
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CircularProgress size={60} thickness={4} />
        </div>
      )}
    </div>
  );
};

export default MentorMatching;
