import React, { Fragment, useRef, useState } from "react";
import { isObject, isArray, cloneDeep } from "lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import jwt_decode from "jwt-decode";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SendIcon from "@mui/icons-material/Send";
import { useMediaQuery } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles"; // Note: makeStyles import remains the same
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { API_ENDPOINT, PayslipSampleData } from "./common";
import Header from './Header'
import { CompanyInfo, EmployeeInfo, EarningAndDeduction, Success, Alert } from "./components";
import Dashboard_menu from "./SideDrawer";
import { Api_url } from "./helper";

const REST_FETCH_API = `${API_ENDPOINT}/payslip`;
const CustomButton = styled(Button)`
  &:hover {
    background-color: #FA5456; /* or specify the desired background color */
  }
`;

const useStyles = makeStyles((theme) => {
	{
		const mobile1 = useMediaQuery('(max-width:600px)');
		return{
	
			layout: {
		
				marginLeft: 'auto',
				marginRight: 'auto',
				padding: mobile1?"0px":'20px',
				opacity: 0.9,
				// Conditionally change the width based on isMobile
				width: mobile1?'100%':'80%',
			},
			paper: {
				marginTop: 3,
				marginBottom: 3,
				padding: '20px',
	 
			},
			section: {
				marginTop: 4,
				marginBottom: '20px'
			},
			root: {
				marginTop: 2,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			},
			input: {
				display: "none",
			},
			uploadButton: {
				cursor: "pointer",
				minWidth: "135px",
			},
			uploadText: {
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis",
			},
			girdButton: {
				marginBottom: 3,
			},
			addButton: {
				marginLeft: 1,
			},
			marginBottom2: {
				marginBottom: 2,
			},
			buttons: {
				display: "flex",
				justifyContent: "flex-end",
				marginTop: 1,
				marginBottom: 2,
			},
			button: {
				marginTop: 3,
				marginLeft: 1,
			},
			floatRight: {
				float: "right",
	  
			},
			marginTop3: {
				marginTop: 3,
			},
		}
	}});

const initialData = {
  company: {
    icon: null,
    iconUrl: "",
    name: "",
    address: "",
  },
  employee: {
    name: "",
    email: "",
    id: "",
    position: "",
    joiningDate: null,
    uan: "",
    accountNumber: "",
    pfAccountNumber: "",
    paidDays: 0,
    lopDays: 0,
  },
  earnings: [],
  deductions: [],
  reimbursements: [],
};

export default function PayslipForm() {
  
	const mobile = useMediaQuery('(max-width:600px)');
	const classes = useStyles(mobile);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", children: "" });
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const templateData = useRef(cloneDeep(initialData));
  const companyRef = useRef();
  const employeeRef = useRef();
  const earningRef = useRef();
  const deductionRef = useRef();
  const reimbursementRef = useRef();

  const handleReset = () => {
    templateData.current = cloneDeep(initialData);

    companyRef.current.reset(templateData.current.company);
    employeeRef.current.reset(templateData.current.employee);
    earningRef.current.reset(templateData.current.earnings);
    deductionRef.current.reset(templateData.current.deductions);
    reimbursementRef.current.reset(templateData.current.reimbursements);
  };

  const onSetSampleData = () => {
    templateData.current = cloneDeep(PayslipSampleData);

    companyRef.current.set(templateData.current.company);
    employeeRef.current.set(templateData.current.employee);
    earningRef.current.set(templateData.current.earnings);
    deductionRef.current.set(templateData.current.deductions);
    reimbursementRef.current.set(templateData.current.reimbursements);
  };
  const token = localStorage.getItem("token1");
	const decoded = jwt_decode(token);
	const userId = decoded._id;
// ...
const REST_API = `${Api_url}/admin`; // Replace with your actual backend URL

// ...

const handleFetchRequest = (type) => {
  return (event) => {
    event.preventDefault();
	if (type === "download") {
        setIsDownloadLoading(true);
      } else if (type === "email") {
        setIsEmailLoading(true);
      }
    // Rest of the function remains the same

    fetch(`${REST_API}/${type === 'download' ? 'generatePdf2' : 'sendEmail'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...templateData.current,user: userId }),
    })
		.then((response) => {
			console.log(response.data);
			console.log(templateData.current, JSON.stringify(templateData.current), 'sss');
			setIsEmailLoading(false);
			setIsDownloadLoading(false);
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'payslip.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        if (type === 'email') {
          setResult({ status: 'success', message: 'Email sent successfully',type:'email' });
        }else if (type === 'download') {
			setResult({ status: 'success', message: 'PDF download successfully',type:'download' });
		  }
      })
      .catch((error) => {
		  console.error('Error:', error);
		  setIsEmailLoading(false);
			setIsDownloadLoading(false);
        setResult({ status: 'error', message: 'Failed to generate PDF or send email' });
      });
  };
};


  return (
    <Fragment>
      <Alert {...alert} duration={5000} onClose={() => setAlert({ ...alert, open: false })} />
		  <Box sx={{ backgroundColor: 'linen',borderRadius:'12px' }} >
			  <Header />
			  <main className={classes.layout} >
				  
        <Paper elevation={0} className={classes.paper} style={{backgroundColor:'peachpuff',borderRadius:'12px' }}>
					  <Typography component="h1" variant={mobile ? "h6" : "h4"} align="center" gutterBottom>
           Invoice Generator
          </Typography>
          {result ? (
            <Success  result={result} setResult={setResult} classes={classes} />
          ) : (
            <Fragment>
              <section className={classes.section}>
									  <CustomButton variant="contained" size="small" className={classes.floatRight} style={{  textTransform:'none',textDecoration:'none',background: 'chocolate',} } onClick={onSetSampleData}>
                  Apply with Sample Data
                </CustomButton>
                <CompanyInfo templateData={templateData} classes={classes} ref={companyRef} />
                <EmployeeInfo templateData={templateData} classes={classes} ref={employeeRef} />
                <EarningAndDeduction type="Amount" templateData={templateData} classes={classes} ref={earningRef} />
                <EarningAndDeduction
                  type="Tax"
                  templateData={templateData}
                  classes={classes}
                  ref={deductionRef}
                />
                <EarningAndDeduction
                  type="discount"
                  templateData={templateData}
                  classes={classes}
                  ref={reimbursementRef}
                />
              </section>

              <div className={classes.buttons}>
                <CustomButton variant="contained" onClick={handleReset} className={classes.button} style={{  textTransform:'none',textDecoration:'none',background: 'chocolate',marginRight:'20px',height:mobile?"52px":""} }>
                  Reset
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  startIcon={
                    isDownloadLoading ? <CircularProgress size={24} thickness={4} value={100} s /> : <GetAppIcon />
                  }
                  onClick={handleFetchRequest("download")}
										  disabled={isDownloadLoading}
										  style={{  textTransform:'none',textDecoration:'none',background: 'chocolate',marginRight:mobile?"13px":'20px',height:mobile?"49px":""} }
                  className={classes.button}
                >
                  Download as PDF
                </CustomButton>
                <CustomButton
                  variant="contained"
                  color="primary"
                  startIcon={isEmailLoading ? <CircularProgress size={24} thickness={4} value={100} /> : <SendIcon />}
                  onClick={handleFetchRequest("email")}
                  disabled={isEmailLoading}
										  className={classes.button}
										  style={{  textTransform:'none',textDecoration:'none',background: 'chocolate',height:mobile?"50px":""} }
                >
                  Send as Email
                </CustomButton>
              </div>
            </Fragment>
          )}
        </Paper>
			  </main>
			  </Box>
    </Fragment>
  );
}

// const useStyles = makeStyles((theme) => ({
// 	layout:  (isMobile) => ({
		
// 		marginLeft: 'auto',
// 		marginRight: 'auto',
// 		padding:isMobile?'20px': '20px',
// 		opacity: 0.9,	
// 		// Conditionally change the width based on isMobile
// 		width: isMobile ? '90%' : '1200px',
// 	  }),
// 	paper: (isMobile) => ({
// 	  marginTop: 3,
// 	  marginBottom: 3,
// 	  padding: isMobile?'20px':'20px',
	 
// 	}),
// 	section: {
// 		marginTop: 4,
// 		marginBottom:'20px'
// 	},
// 	root: {
// 	  marginTop: 2,
// 	  display: "flex",
// 	  alignItems: "center",
// 	  justifyContent: "space-between",
// 	},
// 	input: {
// 	  display: "none",
// 	},
// 	uploadButton: {
// 	  cursor: "pointer",
// 	  minWidth: "135px",
// 	},
// 	uploadText: {
// 	  overflow: "hidden",
// 	  whiteSpace: "nowrap",
// 	  textOverflow: "ellipsis",
// 	},
// 	girdButton: {
// 	  marginBottom: 3,
// 	},
// 	addButton: {
// 	  marginLeft: 1,
// 	},
// 	marginBottom2: {
// 	  marginBottom: 2,
// 	},
// 	buttons: {
// 	  display: "flex",
// 	  justifyContent: "flex-end",
// 	  marginTop: 1,
// 	  marginBottom:2,
// 	},
// 	button: {
// 	  marginTop: 3,
// 	  marginLeft: 1,
// 	},
// 	floatRight: {
// 		float: "right",
	  
// 	},
// 	marginTop3: {
// 	  marginTop: 3,
// 	},
//   }));