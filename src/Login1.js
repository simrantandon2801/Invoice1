import { Password } from '@mui/icons-material';
import { Typography, Grid, Paper,  Button } from '@mui/material';
import { TextField, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import {  FormControlLabel, Checkbox } from '@mui/material';
import 'typeface-inter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Api_url } from './helper';
import { styled } from '@mui/system';
import {  Link,  } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import{ useMediaQuery}  from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material';
import logini from './Images/login.jpg';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
const Login1 = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
  const handleTogglePasswordVisibility2 = () => {
		setShowPassword2((prevShowPassword) => !prevShowPassword);
	  };
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`${Api_url}/admin/Login1`, { Email,Password});
      // Handle response from the backend
      console.log(res);
		localStorage.setItem("token1", res.data);
		toast.success('One More Step to Get Out for Slush');
		setIsLoading(false);
      navigate('/panel')
    } catch (error) {
		console.error(error);
		
		setIsLoading(false);
		toast.error('Invalid Email and Password!');
    }
  
  };
  
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
  return (
    <div>
     <Grid container lg={12} xs={12}  justifyContent="center" alignItems="center" sx={{backgroundColor:'#FA54561A', height:mobile?"50vh":'100vh' }}>
	 <ToastContainer />
	 <Grid container lg={6} xs={12}>
			  <img src={logini} alt='Signup' style={{width:"100%",height: mobile?"50vh":"100vh"}} />	  
			  </Grid>
			  <Grid container lg={6} xs={12}>
    <Paper sx={{ width: '100%',height: mobile?"80vh":'100vh', justifyContent: 'center', display: 'flex', alignItems: 'center', backgroundColor: '#F788281A' }}>
      <Grid container lg={10} xs={12} justifyContent="center" alignItems="center">
        <Grid item lg={10} xs={12} sx={{ textAlign: 'center' ,}}>
          <Typography sx={{ fontSize: '26px', fontFamily: 'Inter', fontWeight: '600', marginTop: '10px' }}>Login</Typography>
        </Grid>
        <Grid item lg={10} xs={12} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: '400' }}>Login to access invoice history</Typography>
        </Grid>
    
        <Grid item lg={8} xs={8} sx={{marginTop:'20px'}} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}>Email</Typography>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Enter your email"
            value={Email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, borderRadius: '6px', backgroundColor: '#F4F1F1' }}
          />
        </Grid>
        <Grid item lg={8} xs={8} >
          <Typography sx={{ textAlign: 'left', fontSize: '16px', fontWeight: '700', fontFamily: 'Inter' }}> Password</Typography>
          <TextField
            required
            fullWidth
						  variant="outlined"
						  type={showPassword2 ? 'text' : 'password'}
            placeholder="Enter password"
            value={Password}
						  size="small"
						  className="custom-textfield"
            onChange={(e) => setPassword(e.target.value)}
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
       
        <Grid item lg={8} xs={8} sx={{textAlign:'right',marginTop:''}} >
<Button

  sx={{
    mt: 0,
    mb: 2,
  
    borderRadius: '12px',
    textTransform: 'none',

    fontSize: '12px',
    fontFamily:'Inter',
    fontWeight:'400',color:'chocolate',marginTop:'-17px',
  }}
  component={Link}  
      to="/Forget" 
>
Forgot Password?
</Button>
</Grid>
        
  

<Grid item lg={8} >

        <CustomButton onClick={handleSubmit}
          type="submit"
          variant="contained"
          sx={{
            mt: 0,
            mb: 0,
            background: 'chocolate',
            borderRadius: '12px',
            textTransform: 'none',
            width:mobile?"220px": '400px',
            height: '56px',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '500'
          }}
        >
          {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}      
        </CustomButton>
     
        </Grid>
         </Grid>
        
				  </Paper>
				  </Grid>
   
</Grid>

    </div>
  );
};

export default Login1;
