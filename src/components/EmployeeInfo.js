import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from "@mui/material";


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers';
export default forwardRef(function EmployeeInfo({ templateData, classes }, ref) {
  const [employee, setEmployee] = useState({ ...templateData.current.employee });
	const mobile = useMediaQuery('(max-width:600px)');
  const handleChange = (property) => {
	return (event) => {
	  const value = event.target.value;
	  templateData.current.employee[property] = value;
	  setEmployee({ ...employee, [property]: value });
	};
  };
  

  useImperativeHandle(ref, () => ({
    set(employee) {
      setEmployee(employee);
    },
    reset(employee) {
      setEmployee(employee);
    },
  }));

  return (
    <>
      <Typography variant="h6" gutterBottom style={{fontSize:mobile?'14px':'20px',fontWeight:mobile?'600':'500'}}>
        Shipping Address
      </Typography>
      <Grid container spacing={3} className={classes.girdButton}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeName"
            name="employeeName"
            label="Shipping Name"
            value={employee.name}
            onChange={handleChange('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeEmail"
            name="employeeEmail"
            label="Shipping Email"
            type="email"
            value={employee.email}
            onChange={handleChange('email')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="position"
            name="position"
            label="Person Position"
            value={employee.position}
            onChange={handleChange('position')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeId"
            name="employeeId"
            label="Order Id"
            value={employee.id}
            onChange={handleChange('id')}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            value={employee.accountNumber}
            onChange={handleChange('accountNumber')}
            fullWidth
          />
			  </Grid>
			  <Grid item xs={12} sm={6}>
          <TextField
            required
            id="joiningDate"
            name="joiningDate"
            label="Billing Date"
            value={employee.joiningDate}
            onChange={handleChange('joiningDate')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="pfAccountNumber"
            name="pfAccountNumber"
            label="GST Number"
            value={employee.pfAccountNumber}
            onChange={handleChange('pfAccountNumber')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="uan"
            name="uan"
            label="IFSC Code"
            value={employee.uan}
            onChange={handleChange('uan')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="paidDays"
            name="paidDays"
            label="Billing Period Start"
            value={employee.paidDays}
            onChange={handleChange('paidDays')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="lopDays"
            name="lopDays"
            label="Billing Period End "
            value={employee.lopDays}
            onChange={handleChange('lopDays')}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
});
