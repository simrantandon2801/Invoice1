import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { capitalize } from 'lodash';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {NumericFormat } from 'react-number-format';
import {useMediaQuery} from '@mui/material';
export default forwardRef(function EarningAndDeduction({ type, templateData, classes }, ref) {
  const [value, setValue] = useState({ name: '', amount: '' });
  const mobile = useMediaQuery('(max-width:600px)');
  const title = capitalize(type) + 's';
  const property = type + 's';
  const totalAmountTitle =
    type === 'Amount'
      ? 'Gross Earnings'
      : type === 'Tax'
      ? 'Total Taxes'
      : type === 'discount'
      ? 'Total Discounts'
      : '';

  useImperativeHandle(ref, () => ({
    set(value) {
      setValue({ name: '', amount: '' });
    },

    reset(value) {
      setValue({ name: '', amount: '' });
    },
  }));

  const onAddRows = () => {
	return (event) => {
	  const amountAsNumber = parseFloat(value.amount);
	  if (!isNaN(amountAsNumber)) {
		// Check if the parsed amount is not NaN (i.e., it's a valid number)
		let array = templateData.current[property] || [];
		templateData.current[property] = [...array, { ...value, amount: amountAsNumber }];
		setValue({ name: '', amount: '' });
	  }
	};
  };
  

  const onRemoveRows = (index) => {
    return (event) => {
      templateData.current[property].splice(index, 1);
      setValue({ name: '', amount: '' });
    };
  };

  const onInputAmountChange = ({ formattedValue, value: amount }) => {
    setValue({ ...value, amount: amount });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style={{fontSize:mobile?'14px':'20px',fontWeight:mobile?'600':'500'}}>
        <span>{title}</span>
      </Typography>

      <Grid container spacing={3} alignItems="flex-end" className={classes.marginBottom2}>
        <Grid item xs={12} lg={5}>
          <TextField
            id={`${type}-name`}
            name="name"
            label="Name"
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <NumericFormat
            id={`${type}-amount`}
            fullWidth
            label="Amount"
            value={value.amount}
            customInput={TextField}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={'₹'}
            onValueChange={onInputAmountChange}
          />
        </Grid>
        <Grid item xs={2} lg={2}>
          <Button
            size="small"
            className={classes.addButton}
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={onAddRows()}
            disabled={!value.name || !value.amount}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      {templateData.current[property] && templateData.current[property].length ? (
        <Grid container spacing={3} className={classes.girdButton}>
          <Grid item xs={12} style={{ marginRight: '24px' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)', width: '20%' }} align="right">
                    Amount(₹)
                  </TableCell>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)', width: '10%' }} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {templateData.current[property].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{row.name}</TableCell>
                    <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="right">
                      <NumericFormat
                        value={row.amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        prefix={'₹'}
                      />
                    </TableCell>
                    <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="right">
                      <IconButton color="secondary" onClick={onRemoveRows(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={`total-${property}`}>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                    <b>{totalAmountTitle}</b>
                  </TableCell>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="right">
                    <b>
                      <NumericFormat
                        value={templateData.current[property].reduce((sum, row) => (sum += +row.amount), 0)}
                        displayType={'text'}
                        thousandSeparator={true}
                        thousandsGroupStyle="lakh"
                        prefix={'₹'}
                      />
                    </b>
                  </TableCell>
                  <TableCell style={{ border: '1px solid rgba(224, 224, 224, 1)' }} align="right">
                    <div style={{ height: '35px' }}></div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
});
