import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React from 'react';
import { TextField, Typography }  from '@mui/material';
import Button from '@mui/material/Button';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "mui-image";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import { Link, Navigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ImageListItemBar from '@mui/material/ImageListItemBar';
import useMediaQuery from '@mui/material/useMediaQuery';

import MobileStepper from '@mui/material/MobileStepper';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Api_url } from './helper';
import Header from './Header';
import Footer from './Footer';

import Authorization from './Images/Authorization.jpg'
import Transaction from './Images/Transaction.jpg';
import Piggy from './Images/piggy.jpg';
import Panel from './Images/panel.jpg';
import Credit from './Images/Credit.jpg';
import Pocket from './Images/pocket.jpg';
import hero from './Images/landing.avif'
import creation from './Images/creation.jpg'
import Download from './Images/Download.jpg'
import Emessage from './Images/E-message.jpg'
import landing from './Images/landing.avif'
import Email1 from './Images/Email1.jpg'
const CustomButton = styled(Button)`
  &:hover {
    background-color: #8B4513; /* or specify the desired background color */
  }
`;
function LandingPage()
{ 
	const mobile = useMediaQuery('(max-width:600px)');
	const m = useMediaQuery('(max-width:412px)');
	const [activeStep, setActiveStep] = React.useState(0);
	const ipad = useMediaQuery('(min-width: 768px) and (max-width: 1180px)  and (orientation: landscape)');
	const ipad1 = useMediaQuery('(min-width: 600px) and (max-width: 900px)  and (orientation: portrait)');
	const [open, setOpen] = React.useState(false);
	const [showConfetti, setShowConfetti] = React.useState(false);
	const navigate = useNavigate();
	const [email, setEmail] = React.useState('');
	const handleSubmit = () => {
		console.log('ues')
	}
	const onSubmit = async (data, e) => {
		setOpen(true);
		setShowConfetti(false);
		const formData = new FormData();
		console.log(data);
		e.preventDefault();
		const response = await fetch(`${Api_url}/api/email/activateD`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => res.json()).then(async (res) => {
			const resData = await res;
			console.log(resData);
			if (resData.status === "success") {
				alert("Message Sent");
			} else if (resData.status === "fail") {
				alert("Message failed to send");
			}
		})
		console.log(JSON.stringify(data));
		console.log(FormData, 'hi');
	  };
	
  const handleClick = () => {
    navigate("/SignUp");
  }
	const handleClose = () => {
		setOpen(false);
		// reset();
	};
	const handlelogin=()=>{
		navigate('/Login')
	}
	const handleClickOpen = () => {
		setOpen(true);
		setShowConfetti(false);
		
	  };
	const maxSteps=4;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
	const hand = () => {
		setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 3000);
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
	};
	const [checked, setChecked] = React.useState(false);

	
	return (
		<>
			<Header />
			<React.Fragment>
			
			<Grid container lg={12}  sx={{marginTop:mobile?'39px':'56px'}}  >
						<Grid container lg={10} xs={12} sx={{margin:'auto'}}>
              <Grid container lg={7} xs={9.5} sx={{margin:mobile?'auto':''}}>
							<Grid item  lg={12} sx={{margin:mobile?'':''}} >
							<Typography  sx={{ fontWeight:mobile?'800': '800', fontSize:mobile?'32px': '61px', color:'#1E1E1E',  lineHeight:mobile?'normal': '77px', fontFamily:mobile?'Inter':'Inter',fontStyle:'normal'}}>
							Invoice  {mobile?'':<br/>}
							Like{mobile?<br/>:""}   a Pro!
</Typography>
					</Grid>
							<Grid item  lg={12}  >
						
								
										<Grid item  lg={9.5} sx={{marginTop:'36px'}} >
							<Typography  sx={{ fontWeight:mobile?'400': '400', fontSize: mobile?'14px':'20px',fontFamily:mobile?'Inter':'Inter',fontStyle:'normal',lineHeight: '130%'}}>Effortlessly create and customize professional invoices, giving your business the polished, expert touch it deserves.

	</Typography>
							</Grid>
              <Grid item lg={11}sx={{marginTop:'16px'}} >
									<Typography  sx={{ fontWeight: '400', fontSize:mobile?'14px': '20px',  fontFamily:'Inter',fontStyle:'normal',lineHeight: '130%'  }}>Take charge of your finances with our intuitive invoice generator, designed to help you invoice like a pro.</Typography>
								</Grid>
								<Grid item lg={10.5}sx={{marginTop:'16px'}} >
									<Typography  sx={{ fontWeight: '400', fontSize:mobile?'14px': '20px',  fontFamily:'Inter',fontStyle:'normal',lineHeight: '130%'  }}>Join the league of professionals who rely on our platform for seamless invoicing, and start managing your finances with confidence. </Typography>
								</Grid>
								
		
					  </Grid>	
					  
					  	 <Grid container direction="row"  lg={8} xs={10}  sx={{marginTop:'32px'}}>
  <Grid item lg={5.8} xs={6} >
							  <CustomButton onClick={handleClick} variant='contained' sx={{ borderRadius: '8px', textTransform: 'none',fontFamily:'Inter' ,fontSize:mobile?'12px': '20px', fontWeight: "500", lineHeight: "24px", width:mobile?'100px':  '188px', height:mobile?'36px': "54px" , backgroundColor: 'chocolate', color: '#fff',fontStyle:'normal' }}>
     Signup
							  </CustomButton>
			
  </Grid>	
  <Grid item lg={5.8} xs={6} >
    <CustomButton onClick={handlelogin}variant='contained' sx={{ borderRadius: '8px', textTransform: 'none',fontFamily:'Inter', fontSize:mobile?'12px': '20px', fontWeight: "500", lineHeight: "24px", width: mobile?'100px': '188px', height:mobile?'36px': "54px", backgroundColor: 'chocolate', color: '#fff',fontStyle:'normal' }}>
     Login
							  </CustomButton>
						
  </Grid>
</Grid>  			  
				
</Grid>
<Grid container lg={5} xs={12}  >
							<Grid item  lg={12}  xs={12} sx={{marginTop:'-80px'}} >	
								
								
             
      {/* <Image
        duration={0}
        src="https://drive.google.com/uc?export=view&id=12Krz59BrmVX6APRgDE5YzM6vck2zHWwS"
        style={{ width: '456px', height: '456px', transitionDuration: '0', animation: '0', position: 'absolute', zIndex: 0 }}
      /> */}
                
                <Image
  duration={0}
  src={hero}
  style={{
    width:mobile?"290px":'426px',
    height:mobile?'290px': '426px',
    marginTop: mobile ? '156px' : '64px',
    transitionDuration: '0',
    animation: '0',
    zIndex: 1,
    borderRadius: '50%',
  // To maintain the aspect ratio of the image within the circle
  }}
/>
      
   
									
									
</Grid>			
						
				</Grid>
				</Grid>
				</Grid>
				<Grid container md={12} lg={10} xs={12} sx={{margin:'auto'}}>
				<Grid item lg={12} xs={12} sx={{mb:mobile ?'10px':'0px',marginTop:mobile?"39px":""}}>
					<Typography variant={mobile ?'subtitle2':'h3'} sx={{
fontstyle: 'normal',
fontWeight: '600',
							fontSize: mobile ? '20px' : '28px', textAlign:'center',
lineHeight: '48px',marginTop:mobile?'35px':'90px'}}>Services Offered</Typography>
					</Grid>
					
					
					<Grid container md={11.5} lg={12} xs={10} sx={{ margin: 'auto',marginTop:mobile?'19px':'36px',display:'flex',backgroundImage:`url(https://drive.google.com/uc?export=view&id=1jg23sMuMUpsHmrtk4vj8syKV1XhTELd6),url(https://drive.google.com/uc?export=view&id=1jg23sMuMUpsHmrtk4vj8syKV1XhTELd6)`, backgroundRepeat: 'no-repeat',backgroundSize:mobile?'39px,42px':'62px',backgroundPosition:mobile?'top left,bottom right':'top left,bottom right' }}>
						<Grid container xs={11} md={11.5} lg={11.5} sx={{margin:'auto',marginBottom:mobile?'0px':'10px',marginTop:mobile?'0px':'10px'}}>
					<Grid item lg={3} md={3}  xs={6} sx={{marginBottom:mobile?'16px':"0px",marginTop:mobile?'11px':"0px"}}>
				<Image src={Authorization} style={{
    justifyContent:'space-around' ,borderRadius: mobile?"8px":'12px', width:'94%',height:'86%'
					}}></Image>	
					<Grid item md={12} xs={12} sx={{justifyContent:'center',display:'flex'}}>	
									<Typography sx={{textAlign:'center',fontSize:mobile?'12px':'18px',fontWeight:'600',lineHeight:'24px'}}>Authentication</Typography>
									</Grid>
				</Grid>
				<Grid item md={3}xs={6}  sx={{marginBottom:mobile?'16px':"0px",marginTop:mobile?'11px':"0px"}}>
				<Image src={creation} style={{
    justifyContent:'space-around',borderRadius:mobile?"8px": '12px', width:'94%',height:'86%'
								}}></Image>
				<Grid item md={12} xs={12} >	
									<Typography sx={{textAlign:'center',fontSize:mobile?'12px':'18px',fontWeight:'600',lineHeight:'24px'}}>Creation</Typography>
									</Grid>	
							</Grid>
							<Grid item md={3}xs={6}  sx={{marginBottom:mobile?'16px':"0px",marginTop:mobile?'11px':"0px"}}>
				<Image src={Piggy} style={{
    justifyContent:'space-around',borderRadius:mobile?"8px": '12px', width:'94%',height:'86%'
								}}></Image>
				<Grid item md={12} xs={12} >	
									<Typography sx={{textAlign:'center',fontSize:mobile?'12px':'18px',fontWeight:'600',lineHeight:'24px'}}>Fetch</Typography>
									</Grid>	
							</Grid>
							<Grid item md={3}xs={6}  sx={{marginBottom:mobile?'16px':"0px",marginTop:mobile?'11px':"0px"}}>
				<Image src={Email1} style={{
    justifyContent:'space-around',borderRadius:mobile?"8px": '12px', width:'94%',height:'82%'
								}}></Image>
				<Grid item md={12} xs={12} >	
									<Typography sx={{textAlign:'center',fontSize:mobile?'12px':'18px',fontWeight:'600',lineHeight:'24px'}}>Email</Typography>
									</Grid>	
							</Grid>
			
							</Grid>
						</Grid>
						</Grid>
			<Grid container md={12} lg={10} xs={12} sm={12} sx={{margin:'auto'}}>
					<Grid item md={12} lg={12} xs={12} sm={12}>
			<Typography  sx={{fontStyle: 'normal',fontWeight: '600',fontSize: mobile?'16px':'24px',lineheight: '40px',marginTop:mobile?'62px':"100px",textAlign:'center'}}>Easy Invoicing for You</Typography>
				</Grid>	
					<Grid container lg={12} md={11} sm={12} xs={11} sx={{m:mobile?'auto':ipad?'0px':'0px',marginTop:mobile?'':'57px',marginBottom:mobile?'':'57px'}}>
				<Grid item lg={2} md={2} xs={4} sm={4} sx={{marginTop:mobile?"10px":"",marginBottom:mobile?"10px":""}}>
				<Image Duration={0} src={landing} style={{
   justifyContent:'space-around',width:mobile?'85px':ipad?"99px":'173px',height:mobile?'64px':ipad?"81px":'120px',transitionDuration:'0',animation:'0' 
  }}></Image>
				</Grid>
				<Grid item lg={2} md={2} xs={4} sm={4}>
				<Image Duration={0} src={Credit} style={{
   justifyContent:'space-around',width:mobile?'85px':ipad?"114px":'173px',height:mobile?'45px':ipad?"80px":'120px',transitionDuration:'0',animation:'0' 
  }}></Image>
				</Grid>
				<Grid item  lg={2} md={2} xs={4} sm={4}>
				<Image Duration={0} src={Piggy} style={{
    justifyContent:'space-around',width:mobile?'85px':ipad?"116px":'174px',height:mobile?'45px':ipad?"88px":'120px',transitionDuration:'0',animation:'0' 
  }}></Image>
				</Grid>
				<Grid item lg={2} md={2} xs={4} sm={4}>
				<Image  Duration={0} src={creation} style={{
    justifyContent:'space-around',width:mobile?'85px':ipad?"138px":'173px',height:mobile?'45px':ipad?"83px":'108px',transitionDuration:'0',animation:'0' 
  }}></Image>
				</Grid>
				<Grid item  lg={2} md={2} xs={4} sm={4}>
				<Image  Duration={0} src={Authorization} style={{
    justifyContent:'space-around',width:mobile?'85px':ipad?"123px":'173px',height:mobile?'45px':ipad?"72px":'104px',transitionDuration:'0',animation:'0' 
  }}></Image>
				</Grid>
				<Grid item  lg={2} md={2} xs={4} sm={4}>
				<Image  Duration={0} src={Email1} style={{
    justifyContent:'space-around',width:mobile?'85px':ipad?"171px":'173px',height:mobile?'45px':ipad?"80px":'120px',transitionDuration:'0',animation:'0' 
							}}></Image>
							
				</Grid>
				</Grid>
			</Grid>
				
					
					<Grid container md={12} sx={{marginTop:mobile?"0px":"62px"}}>
					<Grid item md={12} sx={{margin:mobile?"auto":"auto",display:'flex',justifyContent:'center'}}>
					<Link to='/SignUp' style={{ textDecoration: 'none', fontWeight: 550,margin:'auto' }}>
        <CustomButton variant="contained" size='large' sx={{backgroundColor:'chocolate',textTransform:'none',width:mobile?"95px":"128px",height:mobile?"42px":"48px",borderRadius:"8px",padding:'12px 20px',fontSize:mobile?"12px":"16px",fontWeight:"500",marginTop:mobile?'15px':''}}>See more</CustomButton>
				</Link>
						</Grid>
				</Grid>
		
			<Box sx={{backgroundColor:'seashell',
height: mobile?'475px':'521px',
 marginTop: '70px'
			}} >
				<Box sx={{m:mobile?'0px':ipad?"0px":'80px',alignItems:'center',backgroundPosition:mobile?'26px 88px':'31px 135px',backgroundSize:mobile?'118px':"200px"}}>
			<Grid container md={11} xs={12} lg={12}></Grid>
						<Grid container md={12} xs={12} lg={12} sx={{ justifyContent: 'center' }}>
					<Typography variant='h2' component='div'sx={{
						textAlign: 'center',
fontStyle: 'normal',
fontWeight: '600',
fontSize: mobile?'20px':'36px',marginTop:mobile?'26px':"64px",
								lineHeight: '48px'
							}}>Invoice Simplified</Typography>
						</Grid>
						<Grid container lg={12} md={11.5} xs={12} sx={{margin:mobile?'0px':ipad?"0px":'0px',backgroundImage:mobile?"":'url(https://drive.google.com/uc?export=view&id=)',backgroundRepeat:'no-repeat'}}>
				<Grid container lg={12} md={10.8} xs={12} sx={{marginTop:"33px"}}>
					<Grid container md={4} xs={10} lg={5} sx={{backgroundImage:mobile?'url(https://drive.google.com/uc?export=view&id=1SNCsWeUdLlpXUWq3cwwEbywWMbZk4BDj)':"",backgroundRepeat:'no-repeat',margin:mobile?"auto":"0px",backgroundSize:mobile?"121px 121px":"",borderRadius:"8px"}}>
					
				<Grid item md={6} lg={12}>
								<Image Duration={0} src={Credit} style={{
    justifyContent:'space-around',width:mobile?'272px':ipad?"345px":'463px',height:mobile?'144px':ipad?"192px":'244px',borderRadius: '12px',marginTop:mobile?'30px':"0px",marginLeft:mobile?'20px':'0px',
						}}></Image>
					</Grid>
				</Grid>
								<Grid container lg={7} md={7.5}  xs={12} sx={{marginLeft:'0px',marginTop:mobile?"22px":"0px"}}>
				
									<Grid item md={5} lg={5} xs={5} sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', m: 'auto', width: mobile?'128px':'20px', height: mobile?'42px':'104px' }}>
										<Grid container md={12} lg={12} xs={12} sx={{ml:'7px',mt:mobile?'0px':'18px'}}>
										<Grid item md={2} lg={2} xs={2} sm={2}>
								<Image src="https://drive.google.com/uc?export=view&id=1UFCpEs32Dv1vUZH2fe5Mi_LWzjrOQKLA" style={{
    justifyContent:'space-around',width:mobile?'22px':ipad?"42px":'52.78px',height:mobile?'22px':ipad?"42px":'52px',margin:mobile?'12px':"0px"
											}}></Image>
										</Grid>
							<Grid container md={9} lg={9} xs={8} sx={{m:"auto"}}>
							<Grid item md={12} sm={12} lg={12} xs={12} spacing={3} sx={{margin:'auto'}}>
									<Typography sx={{  fontStyle: 'normal', fontWeight: '600', fontSize:mobile?'9px': ipad?'16px':'16px', lineHeight: mobile ? '11px' :ipad?"20px": '24px',textAlign:'initial' }}>Empowering 100+ Users with Invoicing working 
									</Typography>
									
									</Grid>
								</Grid>
								</Grid>	

						</Grid>	

						
								<Grid item md={5} lg={5} xs={5} sx={{backgroundColor:'#FFFFFF',borderRadius:'12px', m:'auto',width: mobile?'128px':'270px', height: mobile?'42px':'104px'}}>
				<Grid container md={12} xs={12} lg={12} sx={{ml:'7px',mt:mobile?'10px':'18px'}}>
											<Grid item md={2} lg={2} xs={2} sm={2}>
								<Image src="https://drive.google.com/uc?export=view&id=10ZBFOkSfmgx1jibPD4GAZvv8gnN0wDHO" style={{
    justifyContent:'space-around',width:mobile?'22px':ipad?"42px":'52.73px',height:mobile?'22px':ipad?"42px":'52px',margin:'0px'
											}}></Image>
										</Grid>
								
										<Grid container md={9} lg={9} xs={8} sx={{m:"auto"}}>
							<Grid item md={12} sm={12} lg={12} xs={12} spacing={3} sx={{margin:'auto'}}>
									<Typography sx={{  fontStyle: 'normal', fontWeight: '600', fontSize:mobile?'9px': ipad?'16px':'16px', lineHeight: mobile ? '11px' :ipad?"20px": '24px',textAlign:'initial' }}>Countless Invoices Delighting Our Users
									</Typography>
									
									</Grid>
								</Grid>
								</Grid>	

						</Grid>	

						<Grid item md={5} lg={5} xs={5} sx={{backgroundColor:'#FFFFFF',borderRadius:'12px', m:'auto',width: mobile?'128px':'20px', height: mobile?'42px':'104px',marginTop:mobile?'15.76px':"26px"}}>
										<Grid container md={12} lg={12}xs={12} sx={{ml:'7px',mt:mobile?'10px':'18px'}}>
										<Grid item md={2} lg={2.5} xs={2} sm={2}>
								<Image src="https://drive.google.com/uc?export=view&id=1DkRa9ZXUDbUsLqOc_5MIWZ1xkz1I87sw" style={{
    justifyContent:'space-around',width:mobile?'22px':ipad?"42px":'52.78px',height:mobile?'22px':ipad?"42px":'53px',margin:'0px'
									}}></Image></Grid>
								
								<Grid container md={9} lg={9} xs={8} sx={{m:"auto"}}>
							<Grid item md={12} sm={12} lg={12} xs={12} spacing={3} sx={{margin:'auto'}}>
									<Typography sx={{  fontStyle: 'normal', fontWeight: '600', fontSize:mobile?'9px': ipad?'16px':'16px', lineHeight: mobile ? '11px' :ipad?"20px": '24px',textAlign:'initial' }}>Effortless Invoicing

for Your Business Success
									</Typography>
									
									</Grid>
								</Grid>
								</Grid>	

						</Grid>	
						
						<Grid item md={5}lg={5} xs={5} sx={{backgroundColor:'#FFFFFF',borderRadius:'12px', m:'auto',width: mobile?'128px':'20px', height: mobile?'42px':'104px',marginTop:mobile?'15.76px':"26px"}}>
				<Grid container md={12} lg={12}xs={12} sx={{ml:'7px',mt:mobile?'10px':'18px'}}>
											<Grid item md={2} xs={2} lg={2} sm={2}>
								<Image src="https://drive.google.com/uc?export=view&id=16M4SXr_kZ02n8n59_88qFjZD_ezAo4nd" style={{
    justifyContent:'space-around',width:mobile?'22px':ipad?"42px":'52.78px',height:mobile?'22px':ipad?"42px":'53px',margin:'0px'
												}}></Image>
											</Grid>
								
							<Grid container md={8} lg={8} xs={8} sx={{m:"auto"}}>
							<Grid item md={12} lg={12}sm={12}xs={12} spacing={3} sx={{margin:'auto'}}>
									<Typography sx={{  fontStyle: 'normal', fontWeight: '600', fontSize:mobile?"9px": '16px', lineHeight: '24px',textAlign:'initial' }}> Billing Solutions with us for success
									</Typography>
									</Grid>
								</Grid>
								</Grid>	
 
						</Grid>	
							</Grid>
							</Grid>
				</Grid>
					
					<Link to='/Signup' style={{textDecoration: 'none',display:'flex',justifyContent:'center'}}>
						<Button variant='h5' sx={{
						textAlign: 'center', 
						
						fontStyle: 'normal',
						fontWeight: 500,
						fontSize: mobile?'12px':'16px',
						lineHeight: '24px',						
							color: 'chocolate', textDecoration: 'none',textTransform:'none',marginTop:mobile?'15.76px':"62px"
						}}>
							
							Create Your Invoice<ChevronRightIcon /></Button>
						
					</Link>
					
					</Box>
				</Box>
			
			
			
			{/*Founder story for home page*/}
			{/* <Box>
			
			<Paper sx={{backgroundColor:'#bb00000a'}}>
			<Typography variant='h5'>Founder Story</Typography>
			<Grid container md={12}>
			<Grid container md={12} sx={{m:'50px',backgroundColor:'#FFFFFF',borderRadius:'20px'}}>
				<Grid item md={6}sx={{m:'20px'}}>
					<Typography sx={{fontsize:'16px',fontStyle:'Roboto',fontWeight:'400px',color:'#000000'}}>
					Kevin Missal wrote his first book at the age of 14, and at 22, the St. Stephens graduate has turned out to be a bestselling author and a full-time writer with the first two books in his Kalki series being runaway successes. Along with the Narasimha series being published by Harper Collins, his recent release with Penguin reimagines the fabled story of Sinbad the Sailor. Kevin loves fantasy fiction and has always been a fan of mythology. His books have been featured in publications like the Sunday Guardian, The New Indian Express and Millennium Post.
						</Typography>
						</Grid>
						<Grid item md={5} sx={{mx:'0px'}} >
						
						<Image src="https://drive.google.com/uc?export=view&id=1uXojzON_Pp414rpaWSVCPOJO7E8cY9xL" style={{
    justifyContent:'space-around',width:'200px',height:'200px'
					}}></Image>	
							
							</Grid>
					

				</Grid>
				</Grid>
				</Paper>
				</Box> */}
				
			
			
				<Box sx={{backgroundColor:'whitesmoke',width:mobile?"272px":ipad?"960px": '1140px',height:mobile?"264px":ipad?'265px': '272px',borderRadius: '12px',margin:'100px',marginLeft:'auto',marginRight:'auto',marginBottom:mobile?"20px":'20px'}}>
					<Grid container md={12} lg={12} xs={12}>
						<Grid item md={8} lg={7} xs={11.5} sx={{textAlign:mobile?"center":'center',display:'flex',margin:mobile?'auto':ipad?"auto":'auto',marginTop:mobile?'36px':'26px'}}>
							<Typography variant='h3' sx={{margin:'auto',
						fontStyle: 'normal',
						fontWeight: 600,
						fontSize: mobile?'14px':'24px',
						lineHeight: mobile?'20px':'40px',
						/* or 167% */
						
						textAlign: mobile?"center":'center',
								
						
								
								
								
					}}>Unlock Exclusive Invoicing Insights for Business Excellence</Typography>
						</Grid>
					</Grid>
					<Grid container md={12} lg={12} sx={{marginTop:mobile?"32px":"43px"}}>
					
						<Grid container md={12} xs={12} sx={{marginLeft:mobile?'10px':"0px"}}>
						<Grid item md={12} xs={12} sx={{marginTop:mobile?'16px':"0px",display:'flex',justifyContent:'center'}}>
						<Link to='../signup' style={{ textDecoration: "none" }}>
								<CustomButton variant='contained' size={mobile ? 'small' : "large"} sx={{ width: mobile ? '121px' : '226px', borderRadius: '8px', textTransform: "none", margin: mobile ? "0px" : '0px', fontSize: mobile ? '12px' : "", backgroundColor: 'chocolate' }}
								>Signup for Free</CustomButton >
				
    </Link>
							</Grid>
							<Grid item md={12} xs={12} sx={{marginTop:mobile?'0px':"0px",display:'flex',justifyContent:'center'}}>
							<Typography variant='subtitle2' sx={{ color:'#3A81F3',fontSize: mobile?'10px':'14px', color: 'chocolate',marginTop:mobile?'4px':"8px" }}>Elevate Your Business Success.</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			
				<Footer />
				</React.Fragment>
			</>
	);

}
export default LandingPage;