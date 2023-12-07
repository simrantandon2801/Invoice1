import { Password } from '@mui/icons-material';
import { Typography, Grid, Paper,  Button } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'mui-image';
import{ useMediaQuery}  from '@mui/material';
import {Box} from '@mui/material';
import React, { useState } from 'react';
import { Api_url } from './helper';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {useNavigate} from 'react-router-dom'
import {  FormControlLabel, Checkbox } from '@mui/material';
import 'typeface-inter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './InputComponent.css';
// import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import signupImage from './Images/Signup.jpg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { Api_url } from './helper';
import { styled } from '@mui/system';
import 'typeface-inter';

const CustomButton = styled(Button)(({ theme, isInvalid }) => ({
	'&:hover': {
	  backgroundColor: isInvalid ? '#ff0000' : '#8b4513',
	},
	background: isInvalid ? '#ff0000' : '#8B4513',
	borderRadius: '12px',
	textTransform: 'none',
	width: '400px',
	height: '56px',
	fontSize: '20px',
	fontFamily: 'Inter',
	fontWeight: '500',
  }));
const CustomTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
	'& .MuiTooltip-tooltip': {
	  fontSize: '12px',
		  backgroundColor: 'white',
		  borderRadius: '7px',
	  padding:'20px 20px 20px 20px',
	  color: 'black',
	},
  }));
const Entries1 = () => {
	const user = localStorage.getItem('user');
	const useremail = localStorage.getItem('useremail');
	const email1 = localStorage.getItem('email1');
	const [Name, setName] = useState(user || '');
const [Email, setEmail] = useState(useremail || email1 || '');
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false)
	const mobile = useMediaQuery('(max-width:600px)');

const handleTogglePasswordVisibility1 = () => {
  setShowPassword1((prevShowPassword) => !prevShowPassword);
	};
	const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [agreeTerms, setAgreeTerms] = useState(false); 
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  { useremail ? setEmail(useremail) : setEmail(email1) }
	  { user ? setName(user) : setName(Name) }
	  console.log(Email);
	  console.log(user,Name)
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`${Api_url}/admin/slush`, { Name,Email,Password,confirmPassword});
      // Handle response from the backend
		console.log(res);
		localStorage.removeItem('email');
		localStorage.removeItem('email1');
		localStorage.removeItem('user');
		localStorage.removeItem('useremail')
		setIsLoading(false);
		toast.success('Login Successfull');
      navigate('/Login')
	} catch (error) {
		setIsLoading(false);
		toast.error(error.response.data.error);
		toast.error(error.response.data.message);
      console.error(error.response.data.message,'sssr');
    }
   
	};
	const isFormValid = () => {
		const isPasswordValid = validatePassword();
		const doPasswordsMatch = Password === confirmPassword;
	  
		return (
		  Name.trim() !== '' &&
		  (useremail || email1) &&
		  Password.trim() !== '' &&
		  confirmPassword.trim() !== '' &&
		  isPasswordValid &&
		  doPasswordsMatch &&
		  agreeTerms
		);
	  };
    
	  const [anchorEl, setAnchorEl] = React.useState(null);

	  const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handlePopoverClose = () => {
		setAnchorEl(null);
	  };
	
	  const open = Boolean(anchorEl);
	  

	  
    const [Password, setPassword] = useState('');

    const [confirmPassword, setconfirmPassword] = useState('');
    
	// const [passwordValidation, setPasswordValidation] = React.useState('');

	// const handleHover = () => {
	// 	setPasswordValidation('Must contain a number, special character, and both uppercase and lowercase letters. Must be at least 8 characters in length. Must not contain your name.');
	//   };
	  
	
	const validatePassword = () => {
		// Implement your password validation logic here
		// Return true if password meets the requirements, otherwise false
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
		return (regex.test(Password));
	  };
	
	  const getPasswordValidationMessage = () => {
		let message = '';
		if (Password.length < 8) {
		  message = 'Password must be at least 8 characters in length.';
		} else if (!/\d/.test(Password)) {
		  message = 'Password must contain a number.';
		} else if (!/[a-z]/.test(Password)) {
		  message = 'Password must contain a lowercase letter.';
		} else if (!/[A-Z]/.test(Password)) {
		  message = 'Password must contain an uppercase letter.';
		} else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(Password)) {
		  message = 'Password must contain a special character.';
		} 
		return message;
	  };
  return (
	  <>
		
     <Grid container spacing={0} lg={12} justifyContent="center" alignItems="center" sx={{backgroundColor:'#FA54561A', minHeight:"100vh"}}>
	 <ToastContainer/>
		  <Grid container lg={6}>
			  <img src={signupImage} alt='Signup' style={{width:"100%",height:mobile?'50vh':"100vh"}} />	  
 </Grid>
 <Grid container lg={6}>
    <Paper sx={{ width: '100%', height: '100vh', justifyContent: 'center', display: 'flex', alignItems: 'center', backgroundColor: '#F788281A', }}>
      <Grid container lg={10} justifyContent="center" alignItems="center">
        <Grid item lg={12} sx={{ textAlign: 'center' ,}}>
          <Typography sx={{ fontSize: mobile?"20px":'26px', fontFamily: 'Inter', fontWeight: '600', marginTop: '10px' }}>Purchase Summary, Payment Info</Typography>
        </Grid>
        <Grid item lg={10} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: mobile?"10px":'12px', fontFamily: 'Inter', fontWeight: '400' }}>Invoice breakdown and payment information!</Typography>
        </Grid>
        <Grid item lg={8} xs={10} sx={{ marginTop: '20px' }}>
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Name</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your name"
            value={user?user:Name}
						  size="small"
						  disabled={user ? true : false}
						  className="custom-textfield"
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1', }}
          />
        </Grid>
        <Grid item lg={8} xs={10} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your email"
            value={useremail?useremail:email1}
						  size="small"
						
            disabled={email1?true:false}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
          />
        </Grid>
        <Grid item lg={8} xs={10}>
					  <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>New Password
						  <CustomTooltip title={
							  <Box sx={{background:'#F788281A'}}>
        <Typography variant="body2" sx={{background:'white',color:'black'}}>
          <strong>Password requirements:</strong>
          <br />
          Must contain a number, special character, and both uppercase and lowercase letters.
          <br />
          Must be at least 8 characters in length.
          <br />
          Must not contain your name.
								  </Typography>
								  </Box>
      } arrow style={{fontSize:"12px",color:'black',background:'#F788281A'}}>
    <IconButton>
      <InfoIcon />
    </IconButton>
  </CustomTooltip></Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
						  placeholder="Enter password"
						  type={showPassword1 ? 'text' : 'password'}
            value={Password}
						  size="small"
						  className="custom-textfield"
						  error={!validatePassword()}
						  helperText={getPasswordValidationMessage()}
						  InputProps={{ style: { height: "40px" },endAdornment: (
							<InputAdornment position="end">
							  <IconButton onClick={handleTogglePasswordVisibility1} edge="end">
								{showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
							  </IconButton>
							</InputAdornment>
						  ), }}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1','& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
				borderColor: 'red',
			  }, }}
          />
        </Grid>
        <Grid item lg={8}xs={10} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Confirm Password</Typography>
          <TextField
            required
            fullWidth
						  variant="outlined"
						  type={showPassword2 ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
						  size="small"
						  className="custom-textfield"
            onChange={(e) => setconfirmPassword(e.target.value)}
						  sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
						  InputProps={{ style: { height: "40px" },endAdornment: (
							<InputAdornment position="end">
							  <IconButton onClick={handleTogglePasswordVisibility2} edge="end">
								{showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
							  </IconButton>
							</InputAdornment>
						  ), }}
          />
        </Grid>
        
       
   
    <Grid item lg={8} xs={10}>
  <FormControlLabel 
    control={<Checkbox   checked={agreeTerms}
	onChange={(e) => setAgreeTerms(e.target.checked)}
  />}
    label={
      <span >
        By clicking this box, you agree to our
        <span style={{ color: 'chocolate' }}> Terms of Service</span>
        {' '}
        and  <span style={{ color: 'chocolate' }}> Privacy Policy.</span>
        {' '}
      </span>
    }
  />
</Grid>

<Grid item lg={8} xs={10} sx={{marginTop:'20px',marginBottom:'20px'}}>

					  <CustomButton onClick={handleSubmit}
						  type="submit"
						  variant="contained"
						  className="light"
						  sx={{
							  mt: 0,
							  mb: 0,
							  background:"chocolate",
            borderRadius: '12px',
            textTransform: 'none',
            width: mobile?"100%":'-webkit-fill-available',
            height: mobile?"40px": '56px',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '500'
						  }}
						  isInvalid={!isFormValid()}
						  disabled={!isFormValid() || isLoading}
        >
     {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}         
        </CustomButton>
     
        </Grid>
         </Grid>
        
    </Paper>
   </Grid>
</Grid>
</>
   
  );
};

export default Entries1;