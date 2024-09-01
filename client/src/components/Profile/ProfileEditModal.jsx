import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, CircularProgress, Divider, Grid, Chip, IconButton as MuiIconButton } from '@mui/material';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import Fab from '@mui/material/Fab';

const ProfileEditModal = ({ open, onClose, user, onSave }) => {
  const [editableUser, setEditableUser] = useState({
    ...user,
    skills: user.skills || [], // Initialize skills as an empty array if undefined
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setEditableUser({
      ...editableUser,
      [field]: event.target.value,
    });
  };

  const handleArrayChange = (arrayName, index, field) => (event) => {
    const updatedArray = [...editableUser[arrayName]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: event.target.value,
    };
    setEditableUser({
      ...editableUser,
      [arrayName]: updatedArray,
    });
  };

  const addArrayItem = (arrayName) => {
    setEditableUser({
      ...editableUser,
      [arrayName]: [
        ...editableUser[arrayName],
        arrayName === 'education' ? { degree: '', school: '', year: '' } :
        arrayName === 'workExperience' ? { position: '', company: '', duration: '' } :
        arrayName === 'projects' ? { title: '', description: '', link: '' } :
        arrayName === 'certifications' ? { title: '', description: '', link: '' } :
        '',
      ],
    });
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = editableUser[arrayName].filter((_, i) => i !== index);
    setEditableUser({
      ...editableUser,
      [arrayName]: updatedArray,
    });
  };

  const cleanUserData = (userData) => {
    // Filter out fields with empty values
    const filteredUser = { ...userData };

    Object.keys(filteredUser).forEach(key => {
      if (Array.isArray(filteredUser[key])) {
        filteredUser[key] = filteredUser[key].map(item => {
          if (typeof item === 'object') {
            const cleanedItem = Object.fromEntries(
              Object.entries(item).filter(([_, value]) => value && value !== '')
            );
            return Object.keys(cleanedItem).length ? cleanedItem : null;
          }
          return item;
        }).filter(item => item !== null);
      } else if (!filteredUser[key] && filteredUser[key] !== 0) {
        delete filteredUser[key];
      }
    });

    return filteredUser;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const cleanedUser = cleanUserData(editableUser);
      await onSave(cleanedUser);
    } catch (error) {
      console.error('Failed to save user:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1000, height: '80%', overflowY: 'scroll', bgcolor: 'background.paper', p: 4, borderRadius: 2, position: 'relative' }}
      className="no-scrollbar">
        <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <FaTimes />
        </IconButton>

        {/* User Information Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={editableUser?.username || ''}
              onChange={handleChange('username')}
              disabled // Username usually shouldn't be editable
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={editableUser?.name || ''}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Status"
              disabled
              fullWidth
              margin="normal"
              value={editableUser?.status || ''}
              onChange={handleChange('status')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="GitHub"
              fullWidth
              margin="normal"
              value={editableUser?.github || ''}
              onChange={handleChange('github')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="LinkedIn"
              fullWidth
              margin="normal"
              value={editableUser?.linkedin || ''}
              onChange={handleChange('linkedin')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Portfolio"
              fullWidth
              margin="normal"
              value={editableUser?.portfolio || ''}
              onChange={handleChange('portfolio')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="My Portfolio Plugin"
              fullWidth
              disabled
              margin="normal"
              value={editableUser?.myPortfolioPlugin || ''}
              onChange={handleChange('myPortfolioPlugin')}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Education</Typography>
        {editableUser?.education?.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              label="Degree"
              fullWidth
              margin="normal"
              value={edu?.degree || ''}
              onChange={handleArrayChange('education', index, 'degree')}
            />
            <TextField
              label="School"
              fullWidth
              margin="normal"
              value={edu?.school || ''}
              onChange={handleArrayChange('education', index, 'school')}
            />
            <TextField
              label="Year"
              fullWidth
              margin="normal"
              value={edu?.year || ''}
              onChange={handleArrayChange('education', index, 'year')}
            />
            <MuiIconButton onClick={() => removeArrayItem('education', index)}>
              <FaTrash />
            </MuiIconButton>
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>
          Add Education
        </Button>

        <Divider sx={{ my: 2 }} />

        {/* Work Experience */}
        <Typography variant="h6">Work Experience</Typography>
        {editableUser?.workExperience?.map((work, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              label="Position"
              fullWidth
              margin="normal"
              value={work?.position || ''}
              onChange={handleArrayChange('workExperience', index, 'position')}
            />
            <TextField
              label="Company"
              fullWidth
              margin="normal"
              value={work?.company || ''}
              onChange={handleArrayChange('workExperience', index, 'company')}
            />
            <TextField
              label="Duration"
              fullWidth
              margin="normal"
              value={work?.duration || ''}
              onChange={handleArrayChange('workExperience', index, 'duration')}
            />
            <MuiIconButton onClick={() => removeArrayItem('workExperience', index)}>
              <FaTrash />
            </MuiIconButton>
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={() => addArrayItem('workExperience')} startIcon={<FaPlus />}>
          Add Work Experience
        </Button>

        <Divider sx={{ my: 2 }} />

        {/* Projects */}
        <Typography variant="h6">Projects</Typography>
        {editableUser?.projects?.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={project?.title || ''}
              onChange={handleArrayChange('projects', index, 'title')}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={project?.description || ''}
              onChange={handleArrayChange('projects', index, 'description')}
            />
            <TextField
              label="Link"
              fullWidth
              margin="normal"
              value={project?.link || ''}
              onChange={handleArrayChange('projects', index, 'link')}
            />
            <MuiIconButton onClick={() => removeArrayItem('projects', index)}>
              <FaTrash />
            </MuiIconButton>
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={() => addArrayItem('projects')} startIcon={<FaPlus />}>
          Add Project
        </Button>

        <Divider sx={{ my: 2 }} />

        {/* Certifications */}
        <Typography variant="h6">Certifications</Typography>
        {editableUser?.certifications?.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={cert?.title || ''}
              onChange={handleArrayChange('certifications', index, 'title')}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={cert?.description || ''}
              onChange={handleArrayChange('certifications', index, 'description')}
            />
            <TextField
              label="Link"
              fullWidth
              margin="normal"
              value={cert?.link || ''}
              onChange={handleArrayChange('certifications', index, 'link')}
            />
            <MuiIconButton onClick={() => removeArrayItem('certifications', index)}>
              <FaTrash />
            </MuiIconButton>
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={() => addArrayItem('certifications')} startIcon={<FaPlus />}>
          Add Certification
        </Button>

        <Divider sx={{ my: 2 }} />


        <Typography variant="h6">Skills</Typography>
        <Grid container spacing={1}>
      
          {editableUser?.skills?.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Chip
                label={skill}
                onDelete={() => {
                  const updatedSkills = editableUser.skills.filter((_, i) => i !== index);
                  setEditableUser({ ...editableUser, skills: updatedSkills });
                }}
                sx={{ margin: 0.5 }}
              />
            </Grid>
          ))}
        </Grid>
        <TextField
          label="Add Skill"
          fullWidth
          margin="normal"
          value={editableUser.newSkill || ''}
          onChange={(e) => setEditableUser({ ...editableUser, newSkill: e.target.value })}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (editableUser.newSkill) {
              setEditableUser({
                ...editableUser,
                skills: [...editableUser.skills, editableUser.newSkill],
                newSkill: '',
              });
            }
          }}
        >
          Add Skill
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, position:"sticky", bottom:0 }} >
      
          <Fab variant="extended" color="primary" onClick={handleSave} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Fab>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileEditModal;
