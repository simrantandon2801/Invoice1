import React, { useState,useEffect } from 'react';
import { Typography,Grid,Paper,TextField ,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Api_url } from './helper';
import{ useMediaQuery}  from '@mui/material';
import { styled } from '@mui/system';
import Otpp1 from './Images/Otpp1.jpg'
import Authorization from './Images/Authorization.jpg'
import CircularProgress from '@mui/material/CircularProgress';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
const Otp1 = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
	  e.preventDefault();
	  setIsLoading(true);
    try {
      const { data: res } = await axios.post(`${Api_url}/admin/Otp1`, { Otp});
      // Handle response from the backend
		console.log(res);
		setIsLoading(false);
      navigate('/Entries')
	} catch (error) {
		setIsLoading(false);
      console.error(error);
    }
   

   setOtp('');
  }
  const gotoLogin = () => { 
		navigate('/Entries')
	}

	const [Otp, setOtp] = useState('');
	const mobile = useMediaQuery('(max-width:600px)');
	const [isLoading, setIsLoading] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(30);
  useEffect(() => {
    let interval = null;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleResendClick = async (e)=> {
    setRemainingTime(30);
	  setIsButtonDisabled(true);
	  const Email = localStorage.getItem('email1');}

  return (
    <>
       <Grid container lg={12} justifyContent="center" alignItems="center" sx={{backgroundColor:'linen',     height: mobile?"50vh":'100vh'}}>
	   <Grid container lg={6}>
			  <img src={Otpp1} alt='Signup' style={{width:"100%",height:mobile?"50vh":"100vh"}} />	  
			  </Grid>
			  <Grid container lg={6}>
			  <Grid item lg={12}  sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
    <Paper sx={{ width: mobile?"90%":'478px', height: '336px',borderRadius:'26px',justifyContent:'center',display:'flex',alignItems:'center',backgroundColor:'peachpuff'}}>
      <Grid container lg={11} xs={12} justifyContent="center" alignItems="center">
        <Grid item lg={12} xs={12} sx={{textAlign:'center'}}>
        <Typography sx={{fontSize:mobile?"20px":'22px',fontFmaily:'Inter',fontWeight:'600'}}>Invoice: A Formal Request for Payment</Typography>
      </Grid>
      <Grid item lg={12} xs={12}sx={{textAlign:'center'}} >
        <Typography sx={{fontSize:mobile?"10px":'12px',fontFmaily:'Inter',fontWeight:'400' }}>Invoice: Billing Document for Products or Services Rendered</Typography>
      </Grid>
      <Grid item lg={10} xs={10}sx={{marginTop:'20px'}}>
  <Typography sx={{textAlign:'left', fontSize:'16px', fontWeight:'700', fontFamily:'Inter'}}>One Time Password</Typography>
  <TextField
    required
    fullWidth
    variant="outlined"
  
    placeholder="Enter OTP"
    value={Otp}
    size="small"
    onChange={(e) => setOtp(e.target.value)}
    sx={{ mb: 2, borderRadius: '6px',backgroundColor:  '#F4F1F1' }} 
  />
</Grid>
<Grid container lg={10} xs={10} sx={{marginTop:'-20px'}} >
<Grid item lg={6} >
<Button onClick={gotoLogin}

  sx={{
    mt: 0,
    mb: 2,
  
    borderRadius: '12px',
    textTransform: 'none',

    fontSize: '12px',
    fontFamily:'Inter',
    fontWeight:'400',color:'chocolate'
  }}
>
Didn’t receive the OTP?
								  </Button>
								  {remainingTime > 0 && (
        <Typography sx={{fontSize: '12px',
		fontFamily:'Inter',fontWeight:'400',color:'chocolate',marginBottom:'10px'}}>
           Resend the Otp after - <strong>{remainingTime}s</strong>
        </Typography>
      )}
							  </Grid>
						
<Grid item lg={6} sx={{display:'flex',justifyContent:'end'}} >

								  <Button onClick={handleResendClick}
	                                 disabled={isButtonDisabled}
									  sx={{
										  mt: '-6px',
										  mb: 2,
  
										  borderRadius: '12px',
										  textTransform: 'none',

										  fontSize: '12px',
										  fontFamily: 'Inter',
										  fontWeight: '400', color: 'chocolate'
									  }}
								  >
									  Resend OTP
								  </Button>
</Grid>
</Grid>
<CustomButton  onClick={handleSubmit}
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
  {isLoading ? <CircularProgress style={{color:"#ffffff"}} />: 'Verify'} 
    </CustomButton>

      </Grid>
					  </Paper>
					  </Grid>
    </Grid>
</Grid>
    </>
  )
}

export default Otp1
