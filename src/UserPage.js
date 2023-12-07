import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api_url } from './helper';
import { Avatar, Typography } from '@mui/material';
import {useMediaQuery} from '@mui/material';
import Header from './Header';
import Footer from './Footer';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #FA5456; /* or specify the desired background color */
  }
`;
const PayslipApp = () => {
  const [user, setUser] = useState(''); // Replace with your user ID or a way to obtain it
	const [payslips, setPayslips] = useState([]);
	const mobile = useMediaQuery('(max-width:600px)');
	const [isLoading, setIsLoading] = useState(false);
	const [loadingRows, setLoadingRows] = useState([]);
	const [error, setError] = useState('');
	const token = localStorage.getItem("token1");
	const decoded = jwt_decode(token);
  const userId = decoded._id;
  useEffect(() => {
    // Fetch payslip data for the user based on userId using Axios
    axios.get(`${Api_url}/admin/api/payslipsu/${userId}`) // Replace with your API endpoint
      .then((response) => setPayslips(response.data))
		  .catch((error) => console.error('Error fetching payslips:', error));
	  console.log(payslips)
  }, [userId]);
  const [photoUrl, setPhotoUrl] = useState(null);
  const photourl1='https://drive.google.com/uc?export=view&id=1EgKiblMctjLrg256i6b9fI-mrq7LOVIE'

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
				console.error(error);
			  }
	   }
	  fetchPhoto();
  }, [user._id]);
	const handleDownload = (payslipId) => {
		setIsLoading(true);
		setLoadingRows([...loadingRows, payslipId]);
		console.log(payslipId, 's')
axios.get(`${Api_url}/admin/api/payslips/${payslipId}`)
      .then((response) => {
		  console.log(response, 'da')
		  toast.success('Successfully send the email');
		  setLoadingRows((prevRows) => prevRows.filter((rowId) => rowId !== payslipId));
		  setIsLoading(false);
      })
	.catch((error) => {
		setIsLoading(false);
		toast.error('Email not send');
		setLoadingRows((prevRows) => prevRows.filter((rowId) => rowId !== payslipId));
        console.error('Failed to fetch payslip data:', error);
      });
    // Send the "Download" request to the backend for the specified payslipId
    // Implement this part as needed
  };

	const handleEmail = (payslipId) => {
		console.log(payslipId,'s')
    // Send the "Email" request to the backend for the specified payslipId
    // Implement this part as needed
  };

  return (
	  <div>
		  <Header />
		  
		  <Grid container lg={9} xs={10} sx={{ margin: 'auto' }}>
			  <ToastContainer />
			  
		  <Grid item lg={0.8} xs={2} sx={{marginTop:mobile?'20px':"32px",marginBottom:mobile?'36px':"56px"}}>
			  <Avatar src={photoUrl} />
			  </Grid>
			  <Grid item lg={10} xs={10} sx={{ marginTop: mobile ? '26px' : "32px", marginBottom: mobile ? '36px' : "56px" }}>
			  <Typography sx={{fontSize:mobile?'26px':'36px',fontFamily:'Inter',fontWeight:500,color:"#1E1E1E"}}>Records Of {user.Name}</Typography>  
			  </Grid>
			  
			 
		  </Grid>
		  
		 
	  <TableContainer component={Paper} style={{width:mobile?"85%":"85%",margin:'auto', backgroundColor: '#FA54561A'}}>
        <Table style={{ border: '1px solid #000' }}>
          <TableHead style={{ border: '1px solid #000' }}>
            <TableRow style={{ border: '1px solid #000' }}>
              <TableCell style={{ border: '1px solid #000' }}>Billing Name</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Shipping Email</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Order ID</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Person Position</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Billing Date</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Billing Name</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Billing Address</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Total Amount</TableCell>
              <TableCell style={{ border: '1px solid #000' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payslips.map((payslip) => (
              <TableRow key={payslip._id} style={{ border: '1px solid #000' }}>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.employee.name}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.employee.email}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.employee.id}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.employee.position}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{new Date(payslip.employee.joiningDate).toLocaleDateString()}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.company.name}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>{payslip.company.address}</TableCell>
					<TableCell style={{ border: '1px solid #000' }}>{payslip.netIncome}</TableCell>
                <TableCell style={{ border: '1px solid #000' }}>
				{loadingRows.includes(payslip._id) ? (
        <CircularProgress style={{ color: "#FFF" }} />
      ) : (
        <CustomButton variant="outlined" style={{ background: '#F78', textTransform: 'none', color: '#FFF' }} onClick={() => handleDownload(payslip._id)}>
          Email
        </CustomButton>
      )}  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
		  </TableContainer>
		  <Footer/>
    </div>
  );
};

export default PayslipApp;
