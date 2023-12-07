import * as React from 'react';
import { useRef } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import Image from "mui-image";
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, Navigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedIcon from '@mui/icons-material/Feed';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Grid from '@mui/material/Grid';
import { useState,useEffect } from 'react';
import { borderColor } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Editing from './Editing';
import {Footer} from './Footer';
import { Api_url} from './helper';
import { green, blue, grey, red } from "@mui/material/colors";

const pages = [ 'Home','Services','About','Contact','Blog','Signin'];
const drawerWidth = 240;

function Dashboard_menu(props, status, r) {
	const [user, setUser] = useState('');
	const [user1, setUser1] = useState(null);
	const [image, setImage] = useState('');
	const [userData, setUserData] = useState({});
	const [data, setData] = useState({});
	const [data1, setData1] = useState(null);
	const [photo, setphoto] = useState('');
	const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => {
    setShowDialog(false);
  };
	const navigate = useNavigate();
	const logout = () => {
		window.location.href(`${Api_url}/api/auth/logout`, "_self");
		localStorage.removeItem("token");
		localStorage.removeItem("image");
		window.location.reload();
		setUser(null);
		console.log('k')
		navigate('/');
		
	}; 
	const l = () => {
		console.log('k')
	}
	
	


	//   useEffect(() => {
	// 	// fetch the user's profile information from the server
	// 	fetch('/auth/google/callback')
	// 	  .then(res => res.json())
	// 	  .then(user => setUser(user));
	//   }, []);
	
	const [profile, setProfile] = useState(null);
	const phoneNumber = '+91-7060495034';
	const emailAddress = 'Abhijeet@Hubhawks.com';
	console.log(user, 'Dashboard_menu');
	
	const { window } = props;
	const form = useRef();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	
	const mobile = useMediaQuery('(max-width:600px)');
	const [Emotional,setEmotional] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [textInput, setTextInput] = useState("");

	const [write, setWrite] = useState("");
	
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
	  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		return;
	  }
	  setIsOpen(open);
	};
	const drawer1 = (
	  <div 
		role="presentation"
		onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
			style={{width:'258px'}}
	  >
			 <List>
		  <ListItem >
		  <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
      </IconButton>
        </ListItem>
				<ListItem   >
			
				  <ListItemText primary={<Link to='/Home' style={{ textDecoration: 'none',color:'black' }}>Home</Link>} />
				</ListItem>
				
        <ListItem >
				  <ListItemText primary={<Link to='/Services' style={{ textDecoration: 'none', color: 'black' }}>Services</Link>} />
        </ListItem>
        <ListItem >
          <ListItemText primary={<Link to='/about' style={{ textDecoration: 'none', color: 'black' }}>About</Link>} />
        </ListItem>
        <ListItem >
          <ListItemText primary={<Link to='/contact' style={{ textDecoration: 'none', color: 'black' }}>Contact</Link>} />
        </ListItem>
        <ListItem >
          <ListItemText primary={<Link to='/Blog' style={{ textDecoration: 'none', color: 'black' }}>Blog</Link>} />
        </ListItem>
      </List>
	  </div>
	);

const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
	};
	const handlewrite = (event) => {
		setWrite(event.target.value);
	}

	useEffect(() => {
		const getUserFromToken = () => {
			const token = localStorage.getItem("token");
			console.log(token, 'token');
			if (!token)
				return null;
			try {
				const decoded = jwt_decode(token);
				console.log(decoded, 'toksen');
				fetch(`${Api_url}/api/users/${decoded._id}`)
        	.then(res => res.json())
					.then(data => {
						setUser(data)
					}
				
				
				)
        			.catch(err => console.error(err));
				return decoded;
			} catch (error) {
				console.error(error);
				return null;
			}
		};
		getUserFromToken();
	},[])

	




	useEffect(() => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = 100;
		canvas.height = 100;

		ctx.fillStyle = '#ffffff';
		ctx.font = '80px Arial';
		
		{ user && ctx.fillText(user.email[0].toUpperCase(), 10, 90) }
		
		setImage(canvas.toDataURL());

	}, [user]);
	const token1 = localStorage.getItem('user');
	useEffect(() => {
		if (token1) {
			const token1 = localStorage.getItem('user');
			var userObject = jwt_decode(token1);
			console.log(userObject, 'rajiv111');
			if (token1) {
				console.log(token1);
				setData1(userObject);
			
			}
		}
	  }, []);

	  const [selectedIndex, setSelectedIndex] = React.useState(-1);

	  const handleListItemClick = (event, index) => {
		  setSelectedIndex(index);
		  console.log(setSelectedIndex(index), 'select');
		  console.log(index,'tabs')
	  };
	
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/Home');
		if (!localStorage.getItem("token")) {
			window.location.reload(false);	
		}
	};
	const onValueChange=(event)=> {
		setSelectedOption(event.target.value);
		console.log(event.target.value);	
	  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
	};
	const handleClick = () => {
		console.info('You clicked the Chip.');
	  };
	  const responseGoogle = (response) => {
		
		var userObject = jwt_decode(response.credential);
		console.log(userObject,'rajiv');
		localStorage.setItem('user', response.credential);
		console.log(userObject,response.credential, 'kiki');
		navigate('/explore')
	}
  const drawer = (
	  <div>
		 
		  <Box sx={{m:"auto",width:mobile?'320px':'240px'}} >
			  {mobile ?<ListItemButton style={{justifyContent:"flex-end"}}>
				<IconButton onClick={toggleDrawer(false)} style={{ marginLeft: '0px' }}>
          <CloseIcon />
      </IconButton>
			  </ListItemButton>
				  : <Link to='/explore'>
				  <Image duration={0} src="https://drive.google.com/uc?export=view&id=1DAyaOiRTn1fi2eVSohkY6-2XgHxuwLd5" style={{
					  width: '66px',display:"flex",justifyContent:'left',marginRight:'157px',
					  height: '76px'
				  }}></Image></Link>}
			  
			  <div>
      
				  {user ? (<>
					  {image && <>
						<Grid container lg={12} xs={10}>
        <Grid item xs={6} lg={4}>
          <Box component="div" height="100%" style={{marginTop:'38px'}} >
		  <Avatar
  alt="Remy Sharp"
								  src={image} 
  sx={{ width: 64, height: 64,bgcolor: deepOrange[500],margin:'auto' }}
/>
					
          </Box>
							  </Grid>
							  
        <Grid item xs={6} lg={8}>
        <Box component="div" height="100%" padding={2} style={{marginTop:'33px'}}>
		<Typography style={{fontSize:"16px"}}>{user.Name}</Typography>
		  <Typography style={{fontSize:"16px"}}>Author</Typography>
		  </Box>
        </Grid>
      </Grid>
						 
					  </>}
					  
					  
					  


				  </>) : null}
				
				  



    </div>
          </Box>
		  
		
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
    
		  

		  
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
		  </Box>
		  
		 
	  
	
	  </>
  );
}
export default Dashboard_menu;