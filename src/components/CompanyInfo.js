import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid, Typography, TextField, Button, Tooltip, FormControlLabel, Switch } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from './Alert';
import { styled } from '@mui/system';
import {useMediaQuery} from '@mui/material';
const CustomButton = styled(Button)`
  &:hover {
    background-color: #FA5456; /* or specify the desired background color */
  }
`;
// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const CompanyInfo = forwardRef(({ templateData, classes }, ref) => {
  const [company, setCompany] = useState({ ...templateData.current.company });
  const [isEnableCompanyIconUrl, setIsEnableCompanyIconUrl] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const mobile = useMediaQuery('(max-width:600px)');
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    set(company) {
      setCompany(company);
    },

    reset(company) {
      setCompany(company);
    }
  }));

  const handleChange = (property) => (event) => {
    let value = property === 'icon' ? event.target.files[0] : event.target.value;

    if (value && value.type && !value.type.includes('image')) {
      return setOpenAlert(true);
	  }
	  if (property === 'icon') {
		// If the user selected an image, convert it to base64 and store it in templateData
		const file = event.target.files[0];
		if (file && file.type && file.type.includes('image')) {
		  const reader = new FileReader();
		  reader.onload = function (e) {
			const base64Image = e.target.result;
			templateData.current.company.icon = base64Image;
		  };
		  reader.readAsDataURL(file);
		}
	  }

    templateData.current.company[property] = value;
    setCompany({ ...company, [property]: value });
  };

  const onChangeIcon = (e) => {
    let checked = e.target.checked;

    if (checked) {
      templateData.current.company.iconUrl = '';
    } else {
      templateData.current.company.icon = null;
    }

    setCompany({ ...templateData.current.company });
    setIsEnableCompanyIconUrl(checked);
  };

  return (
    <React.Fragment>
		  <Typography variant={mobile?"p":"h6"} style={{fontSize:mobile?'14px':"24px",fontWeight:mobile?"700":""}} gutterBottom>
			  {mobile ? "Billing Inf." : "Billing Information"}
      </Typography>

      <Alert open={openAlert} onClose={setOpenAlert} type="error">Support only image format.(svg, png, jpg)</Alert>

      <Grid container spacing={3} className={classes.girdButton}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={isEnableCompanyIconUrl}
                onChange={onChangeIcon}
                color="primary"
              />
            }
            label="Enable Icon URL"
          />
          {isEnableCompanyIconUrl ? (
            <Grid item xs={12}>
              <TextField
                required
                id="companyIconUrl"
                name="companyIconUrl"
                label="Company Icon URL"
                autoComplete="off"
                value={company.iconUrl}
                onChange={handleChange('iconUrl')}
                fullWidth
              />
            </Grid>
          ) : (
            <div className={classes.root}>
              <input
                accept="image/*"
                className={classes.input}
                id="companyIcon"
                name="companyIcon"
                type="file"
                onChange={handleChange('icon')}
              />
              <div className={classes.uploadText}>
                {company.icon && company.icon.name ? company.icon.name : 'No files chosen'}
              </div>
              <label htmlFor="companyIcon" className={classes.uploadButton}>
                <Tooltip title="Choose your company icon" arrow placement="top">
                  <CustomButton
                    variant="contained"
                    component="span"
										  size="small"
										  style={{  textTransform:'none',textDecoration:'none',background: 'chocolate'} }
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Icon
                  </CustomButton>
                </Tooltip>
              </label>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Billing name"
            autoComplete="off"
            value={company.name}
            onChange={handleChange('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="companyAddress"
            name="companyAddress"
            label="Billing Address"
            value={company.address}
            onChange={handleChange('address')}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

export default CompanyInfo;
