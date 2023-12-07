import React  from 'react'
import { Typography,Grid,Paper,TextField ,Button} from '@mui/material'
import 'typeface-inter';
import { styled } from '@mui/system';
import{ useMediaQuery}  from '@mui/material';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Api_url } from './helper';
import logo from './Images/logo.png';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
const Signup1 = () => {
  const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const mobile = useMediaQuery('(max-width:600px)');
  const handleSubmit = async (e) => {
	  e.preventDefault();
    const email1 = localStorage.setItem('email1', Email);
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`${Api_url}/admin/sign1`, { Email});
    
	  
		console.log(res);
		setIsLoading(false);
      navigate('/Otp')
	} catch (error) {
		setIsLoading(false);
      console.error(error);
    }
   

    setEmail('')
  
  }
  const [Email,setEmail] = useState('');
  return (
    <>
     <Grid container lg={12} justifyContent="center" alignItems="center" sx={{backgroundColor:'linen',     height: '100vh'}}>
<Grid item lg={12} sx={{justifyContent:'center',display:'flex',alignItems:'center'}}>
    <Paper sx={{ width: mobile?"90%":'478px', height: '350px',borderRadius:'26px',justifyContent:'center',display:'flex',alignItems:'center',backgroundColor:'peachpuff'}}>
      <Grid container lg={11} xs={12} justifyContent="center" alignItems="center">
      <Grid item lg={12} xs={12} sx={{textAlign:'center'}}>
      <img src={logo} alt='Signup' style={{width:mobile?'23%':"18%",height: mobile?"69px":"18%"}} />	
      </Grid>
        <Grid item lg={12} xs={12} sx={{textAlign:'center'}}>
        <Typography sx={{fontSize:mobile?"20px":'26px',fontFamily:'Inter',fontWeight:'600'}}>Sign Up with Invoice</Typography>
      </Grid>
						  <Grid item lg={12} xs={12} sx={{textAlign:'center'}} >
        <Typography sx={{fontSize:mobile?"10px":'12px',fontFamily:'Inter',fontWeight:'400' }}>Invoice: Payment request document.</Typography>
      </Grid>
      <Grid item lg={10} xs={10} sx={{marginTop:'20px'}}>
  <Typography sx={{textAlign:'left', fontSize:'16px', fontWeight:'700', fontFamily:'Inter'}}>Email</Typography>
  <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter your email"
    value={Email}
    size="small"
    onChange={(e) => setEmail(e.target.value)}
    sx={{ mb: 2, borderRadius: '6px',backgroundColor:  '#F4F1F1', }} 
  />
</Grid>
<CustomButton onClick={handleSubmit}
      type="submit"
      variant="contained"
      sx={{
        mt: 0,
        mb: 0,
        background: 'chocolate',
        borderRadius: '12px',
        textTransform: 'none',
        width:mobile?"83%": '366px',
        height:mobile?"40px": '56px',
        fontSize: '20px',
        fontFamily:'Inter',
        fontWeight:'500'
        
      }}
    >
							  {isLoading ? <CircularProgress style={{ color: "#FFFFFF" }} />: 'Submit'}    
    </CustomButton>
	
      </Grid>
    </Paper>
    </Grid>
</Grid>
    </>
  )
}

export default Signup1
