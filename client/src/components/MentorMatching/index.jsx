import React, { useState, useEffect, useCallback } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import animationData1 from "./animation.json";
import animationData2 from "./animation2.json";
import animationData3 from "./animation3.json";
import { useTheme } from "../../context/ThemeContext";
import { Actions } from "../../hooks/actions";
// Styled components
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: "none",
  borderRadius: 15,
  maxWidth: 400,
  textAlign: "center",
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: theme.spacing(4),
}));

const MentorCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: "0 auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 15,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const MentorMatching = () => {
  const [openModal, setOpenModal] = useState(true);
  const [stage, setStage] = useState("initial");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [mentorMatched, setMentorMatched] = useState(false);
  const [mentorUserName, setMentorName] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [skillsRequired,setskillsRequired] = useState(false)
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const studentId = Cookies.get("userId");
  const { isDarkMode } = useTheme();
  const [skills,setSkills] = useState([])
  useEffect(() => {
    const checkMentorNeeded = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/student-mentor/${studentId}`);
        const data = response.data;
        if(data.skills.length === 0){
          setskillsRequired(true)
        }
        console.log(data)
        setIsLoading(false);

        if (!data.neededMentor) {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error checking mentor needed:", error);
      }
    };

    checkMentorNeeded();
  }, [studentId, navigate]);

  const fetchMentor = useCallback(async () => {
    setLoading(true);
    try {
      const username = Cookies.get("user");
      const response = await axios.get(`http://127.0.0.1:5000/match-students?username=${username}&index=${count}`);
      const mentorUsername = response.data.mentor;
      setMentorName(mentorUsername);

      if (mentorUsername) {
        const mentorResponse = await axios.get(`http://localhost:3000/mentordata/${mentorUsername}`);
        console.log(mentorResponse.data.data)
        setMentor(mentorResponse.data.data);
      } else {
        console.error("No mentor found in the response.");
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    } finally {
      setLoading(false);
      setStage("showMentor");
    }
  }, [count]);

  const handleAddSkills = async () => {
    try {
      const response = await Actions.UpdateStudent({skills})
      if(response.data.success){
        setskillsRequired(false)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleStartMatching = () => {
    setOpenModal(false);
    setStage("matching");
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

  const handleDontWant = () => {
    navigate("/", { replace: true });
  };
  const handleInputChange = (e) => {
    // Split the input value by spaces or commas into an array
    const inputSkills = e.target.value.split(/[ ,]+/).filter(skill => skill.trim() !== '');
    setSkills(inputSkills);
  };


  if(skillsRequired){
    return (
      <>
         <StyledModal open={skillsRequired} onClose={() => setskillsRequired(false)}>
    <Fade in={skillsRequired}>
      <ModalContent>
        <Typography variant="h5" gutterBottom>Add Your Skills</Typography>
        <Typography variant="body1" paragraph>You need to add skills to continue.</Typography>
        {/* Replace the following input with a skill input component */}
        <input
        className="text-black p-4 m-2"
        type="text"
        onChange={handleInputChange}
        placeholder="Enter skills separated by space or comma"
      />        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSkills} // Example skill list
          fullWidth
        >
          Save Skills
        </Button>
      </ModalContent>
    </Fade>
  </StyledModal>
      </>
    )
  }

  const handleChooseMentor = async () => {
    try {
      await axios.post("http://localhost:3000/assign-mentor", {
        studentId,
        mentorId: mentor._id,
      });
      setMentorMatched(true);
    } catch (error) {
      console.error("Error assigning mentor:", error);
    }
  };

  const handleTryAnother = () => {
    setStage("matching");
    setAnimationIndex(0);
    setCount((prevCount) => prevCount + 1);
    handleStartMatching();
  };

  const animationOptions = (data) => ({
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  const animations = [animationData1, animationData2, animationData3];
  const animationTexts = [
    "Searching for your perfect mentor...",
    "Analyzing your profile and preferences...",
    "Match found! Preparing to introduce you...",
  ];

  const TypedText = ({ text }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text?.length) {
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
      <StyledModal open={openModal} onClose={() => setOpenModal(false)} closeAfterTransition>
        <Fade in={openModal}>
          <ModalContent>
            <IconButton
              aria-label="close"
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleDontWant}
              startIcon={<PersonSearchIcon />}
              fullWidth
              size="large"
              sx={{ mt: 2 }}
            >
              Not now
            </Button>
          </ModalContent>
        </Fade>
      </StyledModal>

      <AnimatePresence mode="wait">
        {stage === "matching" && (
          <motion.div
            key="matching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center"
          >
            <AnimationContainer>
              <Lottie options={animationOptions(animations[animationIndex])} height={300} width={300} />
              <Typography variant="h5" className="mt-8 text-gray-800 font-semibold text-center">
                {animationTexts[animationIndex]}
              </Typography>
            </AnimationContainer>
          </motion.div>
        )}

        {stage === "showMentor" && mentor && !mentorMatched && (
          <motion.div
            key="showMentor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="p-4 md:p-8"
          >
            <MentorCard elevation={3}>
              <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center" mb={4}>
                <Avatar
                  src={mentor.profilePictureUrl || "noavatar.png"}
                  alt={mentor.name}
                  sx={{
                    width: isMobile ? 80 : 120,
                    height: isMobile ? 80 : 120,
                    marginBottom: isMobile ? 2 : 0,
                    marginRight: isMobile ? 0 : 2,
                  }}
                />
                <div>
                  <Typography variant="h4" component="h2">
                    {mentor.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {mentor.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {mentor.email}
                  </Typography>
                </div>
              </Box>

              <InfoItem>
                <IconWrapper>
                  <SchoolIcon />
                </IconWrapper>
                <div>
                  <Typography variant="body1">
                    <strong>Qualifications:</strong><ul> {mentor.qualifications?.map(each=>( <li key={each}>{each}</li>))} </ul>
                  </Typography>
                </div>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <WorkIcon />
                </IconWrapper>
                <div>
                  <Typography variant="body1">
                    <strong>Work Experience:</strong> <ul>{mentor.workExperience?.map(each=>(<li key={each}>{each}</li>))}</ul>
                  </Typography>
                </div>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <EmojiPeopleIcon />
                </IconWrapper>
                <div>
                  <Typography variant="body1">
                    <strong>Skills:</strong> <ul> {mentor?.skills?.map(each=>(<li key={each}>{each}</li>))}</ul>
                  </Typography>
                </div>
              </InfoItem>

              <InfoItem>
                <IconWrapper>
                  <SchoolIcon />
                </IconWrapper>
                <div>
                  <Typography variant="body1">
                    <strong>Certifications:</strong> <ul> {mentor.certifications?.map(each=>(<li key={each}>{each}</li>))}</ul>
                  </Typography>
                </div>
              </InfoItem>

              <Box display="flex" justifyContent="center" mt={4}>
                <IconButton href={mentor.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
                <IconButton href={mentor.socialLinks?.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHubIcon />
                </IconButton>
                <IconButton href={mentor.socialLinks?.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                  <LanguageIcon />
                </IconButton>
              </Box>

              <Box display="flex" justifyContent="center" mt={4}>
                <Button variant="contained" color="primary" onClick={handleChooseMentor} sx={{ marginRight: 2 }}>
                  Choose Mentor
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleTryAnother}>
                  Try Another
                </Button>
              </Box>
            </MentorCard>
          </motion.div>
        )}

        {mentorMatched && (
          <motion.div
            key="mentorMatched"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Mentor Matched Successfully!
            </Typography>
            <Typography variant="body1" align="center">
              You have successfully matched with {mentor.name}. You can now contact your mentor for guidance and support.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/dashboard")}
              sx={{ mt: 4 }}
            >
              Go to Dashboard
            </Button>
          </motion.div>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorMatching;
