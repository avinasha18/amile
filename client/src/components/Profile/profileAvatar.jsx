import React, { useState, useRef } from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { api } from '../../hooks/apis';
import axios from 'axios';
import { setUserData } from '../../services/redux/AuthSlice';
import { useDispatch } from 'react-redux';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const ProfileAvatar = ({ user, isDarkMode, setUser }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [ loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const [error, setError] = useState(''); // For displaying errors

  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (cropper) {
      cropper.destroy(); 
      setCropper(null

      );
    }
    setError(''); // Reset error

  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('File size should be less than 5 MB.');
        return;
      }else{
        setError(null);

      }
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);

      if (cropper) {
        cropper.replace(imageURL); 
      } else {
        const cropperInstance = new Cropper(imageRef.current, {
          aspectRatio: 1,
          viewMode: 1,
          autoCropArea: 1,
        });
        setCropper(cropperInstance);
        cropperInstance.replace(imageURL);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);

    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('photo', blob);
        formData.append('username', user.username);

        try {
          const res = await axios.post(api + '/upload-profile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (res.data.success) {
            handleClose();
            setUser(res.data.student);
            dispatch(setUserData(res.data.student));
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }finally{
          setLoading(false);
        }
      });
    }
  };

  return (
    <>
      <Badge
        badgeContent="+"
        overlap="circular"
        color="secondary"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClick={handleClickOpen}
      >
        <Avatar
          alt={user?.name?.toUpperCase()}
          src={api + '/profile/' + user?.profilePictureUrl}
          className="w-24 h-24 rounded-full mr-6"
          sx={{
            width: 84,
            height: 84,
            bgcolor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#000' : '#fff',
            fontSize: '60px',
          }}
        />
      </Badge>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Upload Profile Picture</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if present */}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div style={{ width: '100%', height: '300px', marginTop: '10px' }}>
            <img ref={imageRef} alt="Crop preview" style={{ maxWidth: '100%', display: selectedFile ? 'block' : 'none' }} />
          </div>
          <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '10px' }} disabled={loading}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileAvatar;
