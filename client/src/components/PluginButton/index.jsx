import { useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  Modal,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import { Actions } from "../../hooks/actions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export const PluginConnectButton = ({
  pluginurl,
  isconnected,
  onSuccess,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [selectedData, setSelectedData] = useState({});
  const [editedData, setEditedData] = useState({});

  const fieldMapping = {
    name: "Name",
    education: "Education",
    workExperience: "workExperience",
    projects: "Projects",
    skills: "Skills",
    achievements: "Achievements",
    certifications: "Certifications",
    github: "Github",
    linkedin: "LinkedIn",
  };

  const handleConnectClick = () => {
    if (isconnected) return;

    setLoading(true);

    const portfolioWindow = window.open(
      `${pluginurl}?page=true&from=${window.location.origin}`,
      "PortfolioApp",
      "width=800,height=600"
    );

    const messageListener = (event) => {
      if (event.origin === "https://portfolionom.vercel.app") {
        if (event.data && event.data.userData) {
          onSuccess({
            pluginName: "myPortfolioPlugin",
            pluginData: event.data.userData,
          });
          setLoading(false);
          portfolioWindow.close();
        }
      }
    };

    window.addEventListener("message", messageListener);

    const cleanup = () => {
      window.removeEventListener("message", messageListener);
      setLoading(false);
    };

    portfolioWindow.addEventListener("beforeunload", cleanup);
  };

  const handleSyncClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://server-qirf.onrender.com/port/${user}`
      );
      if (data) {
        setFetchedData(data);
        setOpenModal(true); // Open modal with fetched data
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdatetoAccount = async () => {
    try {
      // Create the value-to-key mapping
      const valueToKeyMap = Object.entries(fieldMapping).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
      }, {});

      const convertKeys = (data) => {
        return Object.entries(data).reduce((acc, [key, value]) => {
          const mappedKey = valueToKeyMap[key];
          if (mappedKey) {
            acc[mappedKey] = value;
          }
          return acc;
        }, {});
      };

      const convertedSelectedData = convertKeys(selectedData);
      const convertedEditedData = convertKeys(editedData);

      await Actions.UpdateStudent({ ...convertedSelectedData, ...convertedEditedData });
      setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckboxChange = (field) => {
    const mappedField = fieldMapping[field];
    if (Array.isArray(fetchedData[mappedField])) {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [mappedField]: !prevSelectedData[mappedField]
          ? fetchedData[mappedField]
          : undefined,
      }));

      if (!selectedData[mappedField]) {
        setEditedData((prevEditedData) => ({
          ...prevEditedData,
          [mappedField]: fetchedData[mappedField],
        }));
      } else {
        setEditedData((prevEditedData) => {
          const newData = { ...prevEditedData };
          delete newData[mappedField];
          return newData;
        });
      }
    } else {
      setSelectedData((prevSelectedData) => ({
        ...prevSelectedData,
        [mappedField]: !prevSelectedData[mappedField]
          ? fetchedData[mappedField]
          : undefined,
      }));

      if (!selectedData[mappedField]) {
        setEditedData((prevEditedData) => ({
          ...prevEditedData,
          [mappedField]: fetchedData[mappedField],
        }));
      } else {
        setEditedData((prevEditedData) => {
          const newData = { ...prevEditedData };
          delete newData[mappedField];
          return newData;
        });
      }
    }
  };

  const handleInputChange = (field, value, index) => {
    const mappedField = fieldMapping[field];
    if (Array.isArray(editedData[mappedField]) && editedData[mappedField].every(item => typeof item === 'object')) {
      const updatedArray = [...editedData[mappedField]];
      updatedArray[index] = { ...updatedArray[index], ...value };
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [mappedField]: updatedArray,
      }));
    } else {
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [mappedField]: value,
      }));
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        variant="contained"
        onClick={isconnected ? handleSyncClick : handleConnectClick}
        color="secondary"
        disabled={loading}
        size="small"
        sx={{ paddingX: 0, paddingY: 0 }}
      >
        {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        {isconnected ? (
          <Tooltip title="Sync Data From My Portfolio App">
            <AutoAwesomeIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Connect My Portfolio">
            <LinkIcon />
          </Tooltip>
        )}
      </IconButton>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            overflowY: "auto",
            p: 4,
          }}
        >
          <h2>Select and Edit Data to Update</h2>
          <Grid container spacing={2}>
            {Object.keys(fieldMapping).map((key) =>
              fetchedData[fieldMapping[key]] ? (
                <Grid item xs={12} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!selectedData[fieldMapping[key]]}
                        onChange={() => handleCheckboxChange(key)}
                      />
                    }
                    label={key}
                  />
                  {Array.isArray(fetchedData[fieldMapping[key]]) && fetchedData[fieldMapping[key]].every(item => typeof item === 'object') ? (
                    <Box>
                      {selectedData[fieldMapping[key]] && (
                        <>
                          {editedData[fieldMapping[key]].map((item, index) => (
                            <Box key={index} sx={{ mb: 2, border: "1px solid #ddd", p: 2 }}>
                              <Grid container spacing={2}>
                                {Object.keys(item).map((subKey) => (
                                  <Grid item xs={12} sm={6} key={subKey}>
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      value={item[subKey] || ""}
                                      onChange={(e) =>
                                        handleInputChange(key, { [subKey]: e.target.value }, index)
                                      }
                                      margin="dense"
                                      label={subKey}
                                    />
                                  </Grid>
                                ))}
                                <Grid item>
                                  <IconButton
                                    onClick={() => {
                                      const updatedArray = [...editedData[fieldMapping[key]]];
                                      updatedArray.splice(index, 1);
                                      setEditedData((prevEditedData) => ({
                                        ...prevEditedData,
                                        [fieldMapping[key]]: updatedArray,
                                      }));
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => {
                              const updatedArray = [...(editedData[fieldMapping[key]] || [])];
                              updatedArray.push({});
                              setEditedData((prevEditedData) => ({
                                ...prevEditedData,
                                [fieldMapping[key]]: updatedArray,
                              }));
                            }}
                          >
                            Add New
                          </Button>
                        </>
                      )}
                    </Box>
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={editedData[fieldMapping[key]] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      margin="dense"
                      label={key}
                    />
                  )}
                </Grid>
              ) : null
            )}
          </Grid>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpenModal(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDataUpdatetoAccount}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
