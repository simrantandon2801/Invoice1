import React, { useEffect } from 'react';
import { Button, Grid, Popper, Typography,Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material'
import Image from 'mui-image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Api_url } from './helper';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Dialog from '@mui/material/Dialog';
import { LoginSocialFacebook,LoginSocialGoogle } from 'reactjs-social-login'
import {FacebookLoginButton,GoogleLoginButton} from 'react-social-login-buttons'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chip from '@mui/material/Chip';
// import CrownIcon from './Crown';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import logo from './Images/logo.png';
const handleSearch = () => {
    
  console.log('Performing search...');
};
const handleClose = () => {
 
 
};
const handleClosepopup =() =>{

  console.log('yess')
	}
  
const Header = () => {
	const navigate = useNavigate();
	const Gotopage = () => { 
		navigate('/Signup')
	}
	const Gotopage1 = () => { 
		navigate('/Login')
	}
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const[open1,setOpen1]=useState(false);
    const [user, setUser] = useState({});
	const [error, setError] = useState('');
	const mobile = useMediaQuery('(max-width:600px)');
	const ipad = useMediaQuery('(min-width: 768px) and (max-width: 1180px)');
    // const decoded = jwt_decode(token);
	
   

    const token = localStorage.getItem('token1');
    useEffect(() => {
		const token = localStorage.getItem("token1");
		if (token) {
		  console.log("Token:", token); // Check the token value in the console
		  fetchUserData();
		} else {
			console.log("Token not found.");
			navigate('/landing');
		  // Handle the case when token is not present
		  // For example, show login button or redirect to login page
		}
	  }, [token]);
	  
	 
    const fetchUserData = async () => {
      try {
      const token = localStorage.getItem("token1");
      const decoded = jwt_decode(token);
      const userId = decoded._id;
    console.log(userId)
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
			const token = localStorage.getItem("token1");
      
    
      const decoded = jwt_decode(token);
      const userId = decoded._id;
    console.log(userId)
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
        } 
          catch (error) {
            console.log('token')
          }
       }
      fetchPhoto();
    }, [user._id]);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handlepopup = (e) => {
setOpen1(true)
console.log('yes ')
}
const handlepopup1 = (e) => {
  setOpen1(false)
  console.log('yes ')
	}
	const handleChcc = () => { 
		console.log('sss');
		localStorage.removeItem('token1');
		localStorage.removeItem('user');
		localStorage.removeItem('user1');
		navigate('/panel');
	}
	const handleSignup = () => {
		navigate('/Signup')
	}
	const handleRecords = () => {
		navigate('/records')
	}


  const id = open ? 'popover' : undefined;
  const handleAccount = () => { 
		navigate('/Account')
	}
	const handleManuscripts =()=>{
		navigate('/payslip')
	}
  return (
    <>
       <Grid container lg={12} xs={12}>
        <Grid container lg={10.5} xs={11.2} sx={{margin:'auto',marginTop:'25px'}}>
<Grid container lg={8} xs={10}>
<Grid item lg={2} xs={3}  sx={{   display: 'flex',
   justifyContent:'center',
   alignItems:'center'}}  >
 <Image
      Duration={0}
      src={logo}
      style={{
		backgroundColor: '#FA5456',
		  width: mobile?'40px' :'64px',
		borderRadius:'64px',
        height: mobile?'40px' :'64px',
        transitionDuration: '0',
        animation: '0',
      }}
    />
</Grid>

<Grid item lg={2} xs={3} sx={{    display: 'flex',
   justifyContent:'center',
   alignItems:'center'}} >
						  <Typography onClick={handleManuscripts } sx={{fontSize:mobile?'16px' :'20px',fontWeight:'400',fontFamily:'Inter',color:'#1e1e1e'}}>Payslip</Typography>
					  </Grid>
					  <Grid item lg={2} xs={3} sx={{    display: 'flex',
   justifyContent:'center',
						  alignItems: 'center'
					  }} >
						  {token ? <Typography onClick={handleAccount} sx={{ fontSize: mobile ? '16px' : '20px', fontWeight: '400', fontFamily: 'Inter', color: '#1e1e1e' }}>Account</Typography> :
						    <Typography onClick={handleSignup} sx={{fontSize:mobile?'16px' :'20px',fontWeight:'400',fontFamily:'Inter',color:'#1e1e1e'}}>Signup</Typography>}
						
					  </Grid>
					  <Grid item lg={2} xs={3} sx={{    display: 'flex',
   justifyContent:'center',
   alignItems:'center'}} >
						  <Typography onClick={handleRecords} sx={{fontSize:mobile?'16px' :'20px',fontWeight:'400',fontFamily:'Inter',color:'#1e1e1e'}}>Records</Typography>
</Grid>
					  {mobile ? "" : <Grid item lg={4} xs={6.5} sx={{
						  display: 'flex',
						  justifyContent: 'center',
						  alignItems: 'center'
					  }} >
						  <TextField
							  placeholder="Search..."
							  onChange={handleSearch}
							  variant="outlined"
							  sx={{
								  width: mobile ? '200px' : '400px',
								  color: '#FFFFFF',
								  background: 'chocolate',
								  borderRadius: '25px',
								  "& .MuiOutlinedInput-root": {
									  "& fieldset": {
										  border: "none",
										  color: '#FFFFFF',
									  },
									  "&.Mui-focused fieldset": {
										  border: "none",
										  color: '#FFFFFF'
									  },
								  },
							  }}
							  InputProps={{
								  startAdornment: (
									  <IconButton style={{ color: '#FFFFFF' }}>
										  <SearchIcon />
									  </IconButton>
								  ),
							  }}
						  />
					  </Grid>}
</Grid>
{token?<React.Fragment>
						  
						  
						  <Grid item lg={3.7} sx={{display:'flex',justifyContent:'flex-end',marginTop:'20px'}}>
		  <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
        
										  <Avatar alt="User Avatar" src={photoUrl?photoUrl:'sss'} {...bindTrigger(popupState)} />
          
          <Menu {...bindMenu(popupState)}>
           
										  <MenuItem onClick={handleAccount}>My Account</MenuItem>
										  <MenuItem onClick={handleRecords}>Records</MenuItem>
            <MenuItem onClick={handleChcc}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
							  </PopupState>
							  </Grid>
        </React.Fragment>
					  : <Grid item lg={11.6} xs={11.6} sx={{display:'flex',justifyContent:'flex-end',marginTop:mobile?token?'-32px':"-30px":token?"-60px":'-48px'}}>
							  <Typography onClick={()=>setOpen(true)} sx={{fontSize:mobile?'16px' :'20px',fontWeight:'400',fontFamily:'Inter',color:'#1e1e1e'}}>Login</Typography>
    <Dialog open={open} PaperProps={{
										style: {
										  display: "flex",
										  justifyContent: "flex-end",
                      width: "382px", 
      height: "455px",borderRadius:'26px'
										  
										}
									  }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
								>
							
        
              <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' , fontSize: '26px',fontWeight:'700',fontFamily:'Inter', color: '#333333',marginTop: '20px' }}>
      {"Invoice"}
      <IconButton onClick={()=>setOpen(false)}  color="primary" style={{ position: 'absolute', right: 20, top: 20 }}>
        <CloseIcon style={{ color: '#1e1e1e' }} />
      </IconButton>
    </DialogTitle>
    <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' ,fontSize: '12px',fontWeight:'500',fontFamily:'Inter',marginTop: '-25px'  }}>
      Choose your next  bestseller <br /> with just one click
    </DialogTitle>
          <DialogContent style={{overflow:'clip'}}>
          <Grid container lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
										  <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
											  
		
											  <LoginSocialFacebook
												 
		appId="305111921952755"
		onResolve={(response) => {
			console.log(response);
			console.log(response.data);
					  
		
			localStorage.setItem('user', response.data.name);
			localStorage.setItem('useremail', response.data.email);
		console.log(response.data, 'kiki');
		navigate('/Entries')
		
		}}
		onReject={(error) => {
		  console.log(error);
		}}
	  >
		<FacebookLoginButton  text="Sign up with Facebook" style={{borderRadius:'36px',fontSize:'16px',fontFamily:'Inter',fontWeight:500,width:'271px',height:'46px'}} />
										  </LoginSocialFacebook>
										  </Grid>
										  <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center',marginTop:'8px' }}>
										  <LoginSocialGoogle client_id='293510883524-mgl1904653q03crgqpliuqerq0u7mqr1.apps.googleusercontent.com' scope='profile email'
				  onResolve={(response) => {
					  console.log(response.data);
					  
		
					  localStorage.setItem('user', response.data.name);
					  localStorage.setItem('useremail', response.data.email);
		console.log(response.data, 'kiki');
		navigate('/Entries')
					
				  }}
				  onReject={(error) => {
					console.log(error);
				  }}>
					  <GoogleLoginButton text="Sign up with Google" style={{borderRadius:'36px',fontSize:'16px',fontFamily:'Inter',fontWeight:500,width:'271px',height:'46px'}}/>
											  </LoginSocialGoogle>
											  </Grid>
    </Grid>
  
    
        <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center',marginTop:'8px' }}>
      <Typography variant="body1" style={{ fontSize: '12px',fontFamily:'Inter', color: '#333333' }}>
        OR
      </Typography>
    </Grid>
        <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center',marginTop:'8px' }}>
        <Button
      variant="contained"
      color="primary"
											  onClick={Gotopage}
      style={{ borderRadius: '36px', backgroundColor: '#000000',textTransform: 'none',fontSize:'16px',fontFamily:'Inter',fontWeight:600,width:'271px',height:'46px' }}
    >
      Sign up with Email
    </Button>
        </Grid>
        <Grid item lg={12} sx={{textAlign:'center',display:'flex',justifyContent:'center',marginTop:'12px'}}>
       
		<Typography onClick={Gotopage1 } sx={{fontSize: '12px',fontFamily:'Inter', color: '#333333',fontWeight:'500',color:'#5B5A5A'}}> Already have an account? <span style={{ color: '#1e1e1e',fontWeight:'600',fontFamily:'Inter',fontSize:'12px' }}>Login</span></Typography>
        </Grid>
        <Grid item lg={12} sx={{textAlign:'center',display:'flex',justifyContent:'center',marginTop:'26px'}}>
          <Typography style={{ fontSize: '12px',fontFamily:'Inter', color: '#333333',fontWeight:'500' }}>By continuing, you agree to our <span style={{ color: '#1e1e1e',fontWeight:'600',fontFamily:'Inter',fontSize:'12px' }}>Terms of <br/> Service</span>   and <span style={{ color: '#1e1e1e',fontWeight:'600',fontFamily:'Inter',fontSize:'12px' }}>Privacy Policy.</span></Typography>
        </Grid>
      </DialogContent>
          <DialogActions style={{ justifyContent: "space-between"}}>
										
          
			
						
          </DialogActions>
          </Dialog>
					  </Grid>}
        </Grid>
    </Grid>
    </>
  )
}

export default Header
