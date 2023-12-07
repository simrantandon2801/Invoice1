import React from 'react'
import Image from 'mui-image';
import { Grid,Typography,Button } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import panel1 from './Images/panel1.avif';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
const Panel = () => {
	const navigate = useNavigate();
	const token1 = localStorage.getItem('token1')
	const mobile = useMediaQuery('(max-width:600px)');
	const ipad = useMediaQuery('(min-width: 768px) and (max-width: 1180px)');
	const loginpage = () => {
		navigate('/Login')
	}
	const createpage = () => {
		navigate('/payslip')
	}
	const signuppage = () => {
		navigate('/Signup')
	}
  return (
    <>
    <Header/>
    <Grid container lg={12} xs={12} sx={{justifyContent:'center',alignItems:'center',marginTop:'80px',marginBottom:"80px"}}>
<Grid container lg={9} xs={10} sx={{backgroundColor:'peachpuff',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Grid container lg={5} xs={12}>
  <Grid item  lg={12} xs={10} sx={{margin:mobile?"auto":""}} >	 
                          <Image
            duration={0}
            src={panel1}
            style={{
              width: mobile?"150px": '339px',
				height: mobile?"150px":'339px',
				
            
              transitionDuration: '0',
              animation: '0',
              zIndex: 1,
              borderRadius: '339px',
              marginTop:'76px',marginBottom:'76px'
            // To maintain the aspect ratio of the image within the circle
            }}
          />
                
             
                            
                            
          </Grid>	
  </Grid>
  <Grid container lg={5} xs={10}>
    <Grid item lg={12} xs={12}>
      <Typography sx={{fontSize: mobile?'22px':'36px',fontWeight:mobile?'600':'700'}}>Welcome To Invoice Generator</Typography>
      </Grid>
      <Grid item lg={12} xs={12}>
    <Typography sx={{fontSize:mobile?'16px':'20px',fontWeight:'400'}}>Use Our Easy Invoice Generator to Create, Share, and Download Invoices Effortlessly.</Typography>
					  </Grid>
					  {token1 ?
					  <Grid container lg={6} sx={{marginTop:mobile?'18px':'46px',display:'flex',justifyContent:'space-between'}}>
					  <Grid item lg={12} >
					  <CustomButton onClick={createpage} sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',background: 'chocolate',borderRadius:'8px',padding:'12px 20px'}}>Create Now</CustomButton>
					
				  
											   
						 </Grid>
					 
						  </Grid> :
					 <Grid container lg={6} xs={10} sx={{marginTop:mobile?'18px':'46px',display:'flex',justifyContent:'space-between',marginBottom:mobile?'18px':'0px'}}>
					 <Grid item lg={6} >
					 
				 
											  
					   <CustomButton onClick={signuppage} sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',background: '#F78',borderRadius:'8px',padding:'12px 20px'}}>Sign up</CustomButton>
					   
					 </Grid>
					 <Grid item lg={6} >
					
					   <CustomButton onClick={loginpage} sx={{color:'#fff',textTransform:'none',fontSize:'16px',fontWeight:'500',background: '#F78',borderRadius:'8px',padding:'12px 20px'}}>Login</CustomButton>
					 
					 </Grid>
					</Grid>} 
   
  </Grid>
</Grid>
    </Grid>
        {/* <Footer/> */}
    </>
  )
}

export default Panel
