import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import Header from './Header';
import { Grid } from '@mui/material';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Footer from './Footer';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';
import { Typography,TextField,Button,Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { Api_url } from './helper';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useMediaQuery} from '@mui/material';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'typeface-inter';
import { CircularProgress } from '@mui/material';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #FA5456; /* or specify the desired background color */
  }
`;
const MyAccountPage = () => {
	const [showPassword1, setShowPassword1] = useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
	const [showPassword2, setShowPassword2] = useState(false)
	const [cropper, setCropper] = useState();
	const [seet, SetSeet] = useState(null);
	const [loading,setloading]=useState(false)
	const cropperRef = useRef(null);
const handleTogglePasswordVisibility1 = () => {
  setShowPassword1((prevShowPassword) => !prevShowPassword);
	};
	const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
	const [user, setUser] = useState({});
	const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [imageselect, setImageSelected] = useState(null);
	const [is, setis] = useState(null);
	  const token = localStorage.getItem("token1");
	const theme = createTheme({
		components: {
			MuiListItemText: {
				styleOverrides: {
				  primary: {
					color: 'green', // Set the selected value color to green
				  },
				},
			},
			MuiSelect: {
				styleOverrides: {
				  root: {
					backgroundColor: 'red', // Change the background color of the closed Select
				  },
				},
			  },
		  MuiMenuItem: {
			styleOverrides: {
			  root: {
				'&:hover': {
				  backgroundColor: '#FA54561A', // Replace with your desired color
				},
				'&:focus': {
					backgroundColor: '#FA54561A', // Remove focus background color
				  },
				'&$selected': {
					backgroundColor: '#FA54561A', // Set the selected value color to green
				  },
			  },
			},
			},
			
		},
	  });
	const decoded = jwt_decode(token);
	const [photoUrl, setPhotoUrl] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);
	const [croppedImageBlob, setCroppedImageBlob] = useState(null);
	const photourl1='https://drive.google.com/uc?export=view&id=1EgKiblMctjLrg256i6b9fI-mrq7LOVIE'
  const userId = decoded._id;
  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
		const token = localStorage.getItem("token1");
		if (!token) {
		  setError('Token not found.');
		  return;
		}
	
		const decoded = jwt_decode(token);
		const userId = decoded._id;
	
		const response = await fetch(`${Api_url}/admin/user/${userId}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		  },
		});
		if (response.ok) {
		  const data = await response.json();
		  console.log(data)
		setUser(data);
	  } else {
		// Handle error response
		const errorData = await response.json();
		setError(errorData.error);
	  }
	} catch (error) {
	  console.error(error);
	  setError('Failed to fetch user data.');
	}
  };
	useEffect(() => { 
		const fetchPhoto = async () => {
			try {
				console.log(user._id);
				const response = await axios.get(`${Api_url}/admin/users/photo/${userId}`, {
					responseType: 'arraybuffer',
					headers: {
						Accept: 'image/png, image/jpeg',
					},
				});
				console.log(response.data);
				const blob = new Blob([response.data], { type: response.headers['content-type'] });
				const url = URL.createObjectURL(blob);
				setPhotoUrl(url);
				console.log(url);
			} 
			  catch (error) {
				  console.error(error);
				}
		 }
		fetchPhoto();
	}, [user._id]);
	const handleImageUpload1 = (event) => {
		const imageFile = event.target.files[0];
		setis(imageFile);
		console.log(imageFile, 'fliee')
		
		setImageSelected(URL.createObjectURL(imageFile));
	  };
	
	const saveCroppedImage = () => {
		if (cropper) {
			const canvas = cropper.getCroppedCanvas();
			SetSeet(canvas)
			const croppedImageDataURL = canvas.toDataURL('image/png');
			console.log(croppedImageDataURL, 'image');
			setCroppedImage(croppedImageDataURL);
			canvas.toBlob((blob) => {
				setCroppedImageBlob(blob);
			  });
			setImageSelected(croppedImageDataURL);
			setOpenCropDialog(false)
		}
	  };
  const handleImageUpload = async (event) => {
	 
    const formData = new FormData();
	  formData.append('photo', croppedImageBlob);
	  formData.append('userId',userId)
	  setloading(true)
	  try {
		const response = await axios.post(`${Api_url}/admin/users/photo`, formData, {
		  headers: {
			'Content-Type': 'multipart/form-data',
			'Authorization': `Bearer ${localStorage.getItem('token1')}`,
			},
		});
		toast.success('Profile Photo Updated Successfully');
		setloading(false)
		  console.log(response.data);
		  window.location.reload()
	  } catch (error) {
		setloading(false)
		  console.error(error);
		  toast.error('Error Coming in Updating Photo');
		setError('Something went wrong');
	  }
	  
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
	  setOpenDialog(false);
	  setNewPassword('');
	  setConfirmPassword('');

	  
  };
  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
		  await axios.post(`${Api_url}/admin/update-password`, { newPassword,user }); // Replace 123 with the actual user ID
        setNewPassword('');
        setConfirmPassword('');
        alert('Password updated successfully');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Passwords do not match');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     // Replace 123 with the actual user ID
	  toast.error('Please Save the Change Before Moving');
    } catch (error) {
      console.error(error);
    }
	};
	const [openCropDialog, setOpenCropDialog] = useState(true);


  return (
	  <div>
		  <ThemeProvider theme={theme}>
		  <Header />
		  <Grid container lg={10} xs={10} sx={{ margin: 'auto' }}>
			  <Grid item lg={12} sx={{marginTop:mobile?'26px':"32px",marginBottom:mobile?'36px':"56px"}}>
			  <Typography sx={{fontSize:mobile?'26px':'36px',fontFamily:'Inter',fontWeight:500,color:"#1E1E1E"}}>My Account</Typography>  
			  </Grid>
			 
		  </Grid>
		  <ToastContainer />
		  <Grid container lg={10} xs={10} sx={{ margin: 'auto', borderRadius: '12px', backgroundColor: 'peachpuff' }}>
			  <Grid container lg={12} xs={11} sx={{margin:mobile?"16px":'0px',marginTop:mobile?'0px':"46px",marginLeft:mobile?'0px':'60px',marginRight:mobile?'0px':'60px'}}>
		  <Grid container lg={2.5} sx={{justifyContent:mobile?"center":"",marginTop:mobile?'36px':'0px'}}>
				   
				  {imageselect ? <img src={croppedImage} alt="Profile52" style={{width:mobile?"64px":'188px',height:mobile?"64px":'188px',borderRadius:mobile?"64px":'188px'}} />:<img src={photoUrl} alt="Profilephoto" style={{width:mobile?"64px":'188px',height:mobile?"64px":'188px',borderRadius:mobile?"64px":'188px'}} />}  
				  

      
				  <input type="file" id="file-input" accept="image/*" onChange={handleImageUpload1} style={{ display: 'none' }} />
				  {is && (
        <>
 <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)}>
    <DialogTitle>Crop Image</DialogTitle>
    <DialogContent>
      <Cropper
        ref={cropperRef}
        src={imageselect}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={1}
        guides={true}
        dragMode="move"
        autoCropArea={1}
        onInitialized={(cropper) => setCropper(cropper)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenCropDialog(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={saveCroppedImage} variant="contained" color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
				  
          {/* {croppedImage && (
            <div>
              <h3>Cropped Image</h3>
              <img src={croppedImage} alt="Cropped" />
            </div>
          )} */}
				  </>
      )}
					  <Grid item lg={12} xs={12} sx={{marginTop:mobile?"8px":'',marginBottom:mobile?"36px":''}}>
			  <label htmlFor="file-input">
				  <Typography sx={{
						  color: 'chocolate', lineHeight: "24px", fontSize:'16px',textAlign:mobile?'center':''}}>
					  Change Profile Photo  
						  </Typography>
						  </label>
				  </Grid>	
			  </Grid>
			  <Grid container lg={9.5} xs={12} justifyContent="center" sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
     				  <Grid item lg={5}  xs={12} sx={{marginRight:mobile?"0px":"56px",marginLeft:mobile?'16px':'0px'}}>
						  <Typography sx={{fontFamily:'Inter',fontWeight:mobile?'700':'700',fontSize:mobile?'14px':'16px'}}>Name</Typography>
          <TextField
            variant="outlined"
            fullWidth
								  value={user.Name}
								  InputProps={{ style: { height: "40px" } }}
            onChange={(e) => setUser({ ...user, Name: e.target.value })}
       disabled    />
        </Grid>
					  <Grid item lg={5}  xs={12} sx={{marginTop:mobile?'12px':'',marginLeft:mobile?'16px':'0px'}}>
					  <Typography sx={{fontFamily:'Inter',fontWeight:mobile?'700':'700',fontSize:mobile?'14px':'16px'}}>Email</Typography>
          <TextField
          
            variant="outlined"
								  fullWidth
								  InputProps={{ style: { height: "40px" } }}
            value={user.Email}
            disabled
          />
					  </Grid>
					  <Grid item lg={5}  xs={12} sx={{marginRight:mobile?"0px":"56px",marginTop:mobile?'12px':'36px',marginLeft:mobile?'16px':'0px'}}>
					  <Typography sx={{fontFamily:'Inter',fontWeight:mobile?'700':'700',fontSize:mobile?'14px':'16px'}}>Password</Typography>
          <TextField
           
            variant="outlined"
							  fullWidth
							  type="password"
								  value={user.Password}
								  InputProps={{ style: { height: "40px" } }}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
						  />
						  <Typography onClick={handleOpenDialog} sx={{
							  textAlign: "end",fontFamily: 'Inter',fontSize: '14px',color:'chocolate'}}>Change Password</Typography>
					  </Grid>
						  <Dialog open={openDialog} onClose={handleCloseDialog} style={{ borderRadius: "26px" }}>
							  <Button onClick={handleCloseDialog} style={{ justifyContent: 'flex-end',marginRight:'36px',marginTop:'16px' }}><ClearIcon style={{ color: "#1E1E1E" }} /></Button>
        <DialogTitle style={{fontFamily: 'Inter',fontSize:mobile?'20px': '26px',textAlign:'center'}}>Change Password </DialogTitle>
        <DialogContent style={{width:"378px",height:"208px"}}>
         <Typography  style={{fontFamily: 'Inter',fontSize: '16px',fontWeight:"700",textAlign:'initial'}}>Password</Typography>
								  <TextField
           
            type={showPassword2 ? 'text' : 'password'}
            variant="outlined"
									  fullWidth
									  InputProps={{ style: { height: "40px",width:mobile?'71%':'100%' },endAdornment: (
										<InputAdornment position="end">
										  <IconButton onClick={handleTogglePasswordVisibility2} edge="end">
											{showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										  </IconButton>
										</InputAdornment>
									  ), }}
								  value={confirmPassword}
								  onChange={(e) => setConfirmPassword(e.target.value)}
								  />
								  <Typography  style={{fontFamily: 'Inter',fontSize: '16px',fontWeight:"700",textAlign:'initial',marginTop:"13px"}}>New Password</Typography>
          <TextField
           
            type={showPassword1 ? 'text' : 'password'}
            variant="outlined"
									  fullWidth
									  InputProps={{ style: { height: "40px",width:mobile?'71%':'100%' },endAdornment: (
										<InputAdornment position="end">
										  <IconButton onClick={handleTogglePasswordVisibility1} edge="end">
											{showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
										  </IconButton>
										</InputAdornment>
									  ), }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
								  />
								  <Button onClick={handleChangePassword} variant='contained' sx={{background:'#007F85',textTransform:'none',width:mobile?"71%":'366px',marginTop:'26px'}} color="primary">
            Change Password
          </Button>
        </DialogContent>
       
      </Dialog>
					  <Grid item lg={5}  xs={12} sx={{marginTop:mobile?'12px':'36px',marginLeft:mobile?'16px':'0px'}}>
					  <Typography sx={{fontFamily:'Inter',fontWeight:mobile?'700':'700',fontSize:mobile?'14px':'16px'}}>Confirm Password</Typography>
          <TextField
           
            variant="outlined"
            fullWidth
								  value={user.confirmPassword}
								  InputProps={{ style: { height: "40px" } }}
            disabled
          />
        </Grid>
		
       
    
				  </Grid>
				  <Grid container lg={11.5} xs={12}>
					  
				  <Grid container lg={12} xs={12} sx={{justifyContent:'end',display:'flex',marginTop:mobile?"57px":'36px',marginBottom:mobile?'36px':'46px'}}>
						  <Grid item lg={10.2} xs={5.5} sx={{justifyContent:'end',display:'flex'}}>
						  <CustomButton type="submit" style={{ color: "chocolate", border: '1px solid chocolate', textTransform: 'none',width:'53px' ,borderRadius:'8px'}} onClick={handleSubmit}>
            Cancel
						  </CustomButton>  
						  </Grid>
						  <Grid item lg={1.8} xs={6.5} sx={{justifyContent:'end',display:'flex'}}>
						  <CustomButton type="submit" style={{ backgroundColor: "chocolate",textTransform:'none',borderRadius:"8px"}} variant="contained" onClick={handleImageUpload}>
            {loading?<CircularProgress style={{width:'20px',height:'20px',color:'#fff'}}/>:'Save Changes'}
          </CustomButton> 
							  </Grid>
						  
						  
        </Grid>  
				 </Grid>
			  </Grid>
			    
		  </Grid>
		  
    
			  <Footer />
			  </ThemeProvider>
    </div>
  );
};

export default MyAccountPage;