const router=require("express").Router();
const bcrypt=require('bcrypt');
const Joi = require("joi");
const { User, validate } = require('./Models/user');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const multer = require('multer');
const axios = require('axios');
const upload = multer();
const validate1 = (data) => {
	const schema = Joi.object({
		Email: Joi.string().email().required().label("Email"),
		Password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};
const mongoose = require('mongoose');
const Api_url='https://invoice-tw49.onrender.com'

const earningSchema = new mongoose.Schema({
	name: String,
	amount: Number,
  });
  
  const deductionSchema = new mongoose.Schema({
	name: String,
	amount: Number,
  });
  
  const reimbursementSchema = new mongoose.Schema({
	name: String,
	amount: Number,
  });
  
  const payslipSchema = new mongoose.Schema({
	company: {
	  icon: String,
	  iconUrl: String,
	  name: String,
	  address: String,
	},
	employee: {
	  name: String,
	  email: String,
	  id: String,
	  position: String,
	  joiningDate: Date,
	  uan: String,
	  accountNumber: String,
	  pfAccountNumber: String,
	  paidDays: Number,
	  lopDays: Number,
	},
	earnings: [earningSchema],
	deductions: [deductionSchema],
	  reimbursements: [reimbursementSchema],
	  user: { // Add the userId field
		type: String, // Modify the data type as per your user ID data type
		required: true,
	  },
	  netIncome: Number,
	// Add other fields as needed
  });
  
  

const Payslip = mongoose.model('Payslip', payslipSchema);
const fs = require('fs');
const timesRomanFontBytes = fs.readFileSync('./inter-font/Inter-V.ttf');
const fontData = timesRomanFontBytes.toString('base64');

const { PDF_CONTENT, YOUR_EMAIL_ACCOUNT, YOUR_EMAIL_PASSWORD } = require('./Config');

const fonts = {
	Roboto: {
	  normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Regular.ttf',
	  bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Medium.ttf',
	  italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-Italic.ttf',
	  bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/fonts/Roboto/Roboto-MediumItalic.ttf',
	},
  };
 
  function convertNumberToRupees(number) {
	const words = [
	  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
	  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
	];
  
	const tens = [
	  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
	];
  
	if (number === 0) {
	  return 'Zero';
	}
  
	if (number < 20) {
	  return words[number];
	}
  
	if (number < 100) {
	  return tens[Math.floor(number / 10)] + ' ' + words[number % 10];
	}
  
	if (number < 1000) {
	  return words[Math.floor(number / 100)] + ' Hundred ' + convertNumberToRupees(number % 100);
	}
  
	if (number < 100000) {
	  return convertNumberToRupees(Math.floor(number / 1000)) + ' Thousand ' + convertNumberToRupees(number % 1000);
	}
  
	if (number < 10000000) {
	  return convertNumberToRupees(Math.floor(number / 100000)) + ' Lakh ' + convertNumberToRupees(number % 100000);
	}
  
	return 'Number too large';
}
function calculateTotalNetIncome(templateData) {
	// Calculate total earnings
	const totalEarnings = templateData.Amounts.reduce((acc, earning) => acc + earning.amount, 0);
  
	// Calculate total deductions
	const totalDeductions = templateData.Taxs.reduce((acc, deduction) => acc + deduction.amount, 0);
  
	// Calculate total reimbursements
	const totalReimbursements = templateData.discounts.reduce((acc, reimbursement) => acc + reimbursement.amount, 0);
  
	// Calculate total net income
	const totalNetIncome = totalEarnings - totalDeductions + totalReimbursements;
  
	return {
	  totalNetIncome,
	  totalNetIncomeInWords: convertNumberToRupees(totalNetIncome),
	};
  }
  

router.post('/generatePdf2', async (req, res) => {
	const templateData = req.body;
	console.log(req.body)
	const resultm = calculateTotalNetIncome(templateData);

	templateData.netIncome = resultm.totalNetIncome;
	try {
		const payslip = new Payslip(templateData);
		await payslip.save();
		
	  } catch (error) {
		console.error('Error saving payslip data:', error);
		return res.status(500).send('Error saving payslip data');
	  }
	
  // Assuming the request body contains the template data sent from the frontend
  const imageUrl = 'https://drive.google.com/uc?export=download&id=1APHGoS1kF9-lZDCgLmEyAZ7H5KVEaLed'; // Direct link to the image file
  const formattedJoiningDate = new Date(templateData.employee.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentDate = new Date();

  // Get the current month from the current date
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const response = await axios.get(imageUrl, {
	responseType: 'arraybuffer',
  });

  // Convert the image data to base64
  const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
// After fetching the image data


// Before adding the image to the document


  // Create a new jsPDF instance
  const doc = new jsPDF();
  doc.addFileToVFS('Inter-V.ttf', fontData);
	doc.addFont('Inter-V.ttf', 'Inter', 'normal');
	doc.addFont('Inter-V.ttf', 'Inter', 'bold');
	doc.addFont('Inter-V.ttf', 'Inter', 'italic');
  // Set font size and style
  doc.setFontSize(16);
  doc.setFont('Inter', 'normal');
  // Add company name and address
  doc.text(templateData.company.name, 20, 20);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(12);
  doc.text(templateData.company.address, 20, 30);

  // Add company logo (if available)
  if (templateData.company.iconUrl) {
	const logoUrl = imageBase64;
	doc.addImage(logoUrl, 'JPEG', 160, 10, 30, 30);
	} else if (templateData.company.icon ) {
		const logoBase64 = templateData.company.icon;
		doc.addImage(logoBase64, 'JPEG', 160, 10, 30, 30);
	  }
 
  // Add payslip title
  doc.setFontSize(24);
  doc.text(`Invoice for the Month ${currentMonth}`, 20, 60);

  // Reset font size and style
  doc.setFontSize(12);

  // Add employee details
  doc.text(` Shipping Name: ${templateData.employee.name}`, 20, 80);
  doc.text(` Order ID: ${templateData.employee.id}`, 20, 90);
  doc.text(`Billing Date: ${formattedJoiningDate}`, 20, 100);
	doc.text(`Account Number:`, 20, 110);
	doc.text(`${templateData.employee.accountNumber}`, 20, 120);
	doc.text(`GST Number:`, 100, 110);
	doc.text(` ${templateData.employee.pfAccountNumber}`, 100, 120);
	doc.text(`IFSC:`, 180, 110);
	doc.text(`${templateData.employee.uan}`, 180, 120);
doc.text(`Billing Period Start: ${templateData.employee.paidDays}`, 20, 140);
doc.text(`Billing Period End: ${templateData.employee.lopDays}`, 20, 150);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(24);
  // Add total net income
  doc.text(`Total Amount:`, 130, 80);
  doc.setFont('Inter', 'bold');
  doc.setFontSize(20);
	const rupeeSymbol = "₹";
	const result = calculateTotalNetIncome(templateData);
  doc.text(`${rupeeSymbol}${result.totalNetIncome}`, 150, 95);

  // Add earnings table
  let tableYPos = 120;
   // Horizontal line under the table header

  const earningsData = templateData.Amounts.map((earning) => [earning.name, `${rupeeSymbol}${earning.amount}`]);
  
	doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Amounts Name', 'Amount']],
	  body: earningsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add deductions table
  tableYPos = doc.lastAutoTable.finalY + 10;
   // Horizontal line under the table header

  const deductionsData = templateData.Taxs.map((deduction) => [deduction.name, `${rupeeSymbol}${deduction.amount}`]);
  
  doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Taxs Name', 'Amount']],
	  body: deductionsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add reimbursements table
  tableYPos = doc.lastAutoTable.finalY + 10;
// Horizontal line under the table header

  const reimbursementsData = templateData.discounts.map((reimbursement) => [reimbursement.name, `${rupeeSymbol}${reimbursement.amount}`]);
  
  doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Discounts Name', 'Amount']],
	  body: reimbursementsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add date and signature
  tableYPos = doc.lastAutoTable.finalY + 20;
  doc.text(`Date: ${new Date().toDateString()}`, 20, tableYPos);
	doc.text('Signature: ______________________', 130, tableYPos);
	
  doc.setFillColor(135, 206, 235); // Sky Blue color
  doc.rect(20, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 40, 20, 'F'); // Draw the sky blue rectangle

  doc.setFont('Inter', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255); // White color
  doc.text('Total Amount', 25, doc.internal.pageSize.height - 20); // Footer text "Total Net Payable"

  doc.setFont('Inter', 'normal');
  doc.text(`${rupeeSymbol}${result.totalNetIncome} (${result.totalNetIncomeInWords}only)`, 70, doc.internal.pageSize.height - 20); // Footer amount in words

  const pdfData = doc.output('arraybuffer');

  // Check if the pdfData is available
  if (pdfData) {
	res.writeHead(200, {
	  'Content-Type': 'application/pdf',
	  'Content-Disposition': 'attachment; filename=payslip.pdf',
	  'Content-Length': pdfData.byteLength, // Use byteLength to get the correct length
	});
	res.end(Buffer.from(pdfData), 'binary');
  } else {
	res.status(500).send('Error generating PDF');
  }
});
router.post('/generatePdf3', async (req, res) => {
	const templateData = req.body;
	
  // Assuming the request body contains the template data sent from the frontend
  const imageUrl = 'https://drive.google.com/uc?export=download&id=1APHGoS1kF9-lZDCgLmEyAZ7H5KVEaLed'; // Direct link to the image file
  const formattedJoiningDate = new Date(templateData.employee.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentDate = new Date();

  // Get the current month from the current date
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const response = await axios.get(imageUrl, {
	responseType: 'arraybuffer',
  });

  // Convert the image data to base64
  const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
// After fetching the image data


// Before adding the image to the document


  // Create a new jsPDF instance
  const doc = new jsPDF();
  doc.addFileToVFS('Inter-V.ttf', fontData);
	doc.addFont('Inter-V.ttf', 'Inter', 'normal');
	doc.addFont('Inter-V.ttf', 'Inter', 'bold');
	doc.addFont('Inter-V.ttf', 'Inter', 'italic');
  // Set font size and style
  doc.setFontSize(16);
  doc.setFont('Inter', 'normal');
  // Add company name and address
  doc.text(templateData.company.name, 20, 20);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(12);
  doc.text(templateData.company.address, 20, 30);

  // Add company logo (if available)
  if (templateData.company.iconUrl) {
	const logoUrl = imageBase64;
	doc.addImage(logoUrl, 'JPEG', 160, 10, 30, 30);
	} else if (templateData.company.icon ) {
		const logoBase64 = templateData.company.icon;
		doc.addImage(logoBase64, 'JPEG', 160, 10, 30, 30);
	  }
 
  // Add payslip title
  doc.setFontSize(24);
  doc.text(`Invoice for the Month ${currentMonth}`, 20, 60);

  // Reset font size and style
  doc.setFontSize(12);

  // Add employee details
  doc.text(` Shipping Name: ${templateData.employee.name}`, 20, 80);
  doc.text(` Order ID: ${templateData.employee.id}`, 20, 90);
  doc.text(`Billing Date: ${formattedJoiningDate}`, 20, 100);
	doc.text(`Account Number:`, 20, 110);
	doc.text(`${templateData.employee.accountNumber}`, 20, 120);
	doc.text(`GST Number:`, 100, 110);
	doc.text(` ${templateData.employee.pfAccountNumber}`, 100, 120);
	doc.text(`IFSC:`, 180, 110);
	doc.text(`${templateData.employee.uan}`, 180, 120);
doc.text(`Billing Period Start: ${templateData.employee.paidDays}`, 20, 140);
doc.text(`Billing Period End: ${templateData.employee.lopDays}`, 20, 150);
  doc.setFont('Inter', 'normal');
  doc.setFontSize(24);
  // Add total net income
  doc.text(`Total Amount:`, 130, 80);
  doc.setFont('Inter', 'bold');
  doc.setFontSize(20);
	const rupeeSymbol = "₹";
	const result = calculateTotalNetIncome(templateData);
  doc.text(`${rupeeSymbol}${result.totalNetIncome}`, 150, 95);

  // Add earnings table
  let tableYPos = 120;
   // Horizontal line under the table header

  const earningsData = templateData.Amounts.map((earning) => [earning.name, `${rupeeSymbol}${earning.amount}`]);
  
	doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Amounts Name', 'Amount']],
	  body: earningsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add deductions table
  tableYPos = doc.lastAutoTable.finalY + 10;
   // Horizontal line under the table header

  const deductionsData = templateData.Taxs.map((deduction) => [deduction.name, `${rupeeSymbol}${deduction.amount}`]);
  
  doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Taxs Name', 'Amount']],
	  body: deductionsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add reimbursements table
  tableYPos = doc.lastAutoTable.finalY + 10;
// Horizontal line under the table header

  const reimbursementsData = templateData.discounts.map((reimbursement) => [reimbursement.name, `${rupeeSymbol}${reimbursement.amount}`]);
  
  doc.autoTable({
	  startY: tableYPos + 10,
	  head: [['Discounts Name', 'Amount']],
	  body: reimbursementsData,
	  styles: {font:'Inter', bold: true,
		header: { fillColor: '#f3f3f3' },
		tableHeader: { fillColor: '#f3f3f3', bold: true }
	  }
	});
  // Add date and signature
  tableYPos = doc.lastAutoTable.finalY + 20;
  doc.text(`Date: ${new Date().toDateString()}`, 20, tableYPos);
	doc.text('Signature: ______________________', 130, tableYPos);
	
  doc.setFillColor(135, 206, 235); // Sky Blue color
  doc.rect(20, doc.internal.pageSize.height - 30, doc.internal.pageSize.width - 40, 20, 'F'); // Draw the sky blue rectangle

  doc.setFont('Inter', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255); // White color
  doc.text('Total Amount', 25, doc.internal.pageSize.height - 20); // Footer text "Total Net Payable"

  doc.setFont('Inter', 'normal');
  doc.text(`${rupeeSymbol}${result.totalNetIncome} (${result.totalNetIncomeInWords}only)`, 70, doc.internal.pageSize.height - 20); // Footer amount in words

  const pdfData = doc.output('arraybuffer');

  // Check if the pdfData is available
  if (pdfData) {
	res.writeHead(200, {
	  'Content-Type': 'application/pdf',
	  'Content-Disposition': 'attachment; filename=payslip.pdf',
	  'Content-Length': pdfData.byteLength, // Use byteLength to get the correct length
	});
	res.end(Buffer.from(pdfData), 'binary');
  } else {
	res.status(500).send('Error generating PDF');
  }
});
router.post('/sendEmail', async(req, res) => {
	const { data, toEmail } = req.body;
	const templateData = req.body;

const response = await axios.post(`${Api_url}/admin/generatePdf3`, req.body);
const transporter = nodemailer.createTransport({
	host: 'smtp.hostinger.com',
port: 465,
secure: true,
	auth: {
		user: 'sales@rajivkhanduja.com',
		pass: 'Rajiv@123'
	},
  });

const mailOptions = {
	from: 'sales@rajivkhanduja.com',
	to: templateData.employee.email, // Replace with the recipient's email
	subject: 'Payslip PDF',
	text: 'Please find the attached payslip PDF.',
	attachments: [
	  {
		filename: 'payslip.pdf',
		content: response.data,
	  },
	],
  };

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
	console.log('Error sending email:', error);
	res.status(500).send('Error sending email');
  } else {
	console.log('Email sent:', info.response);
	res.status(200).send('Email sent successfully');
  }
});
});
router.get('/api/payslips/:id', async (req, res) => {
	try {
	  // Find the payslip by ID
	  const payslipId = req.params.id;
	  const payslip = await Payslip.findById(payslipId);
  
	  if (!payslip) {
		return res.status(404).json({ error: 'Payslip not found' });
	  }
  
	  // Send the payslip data as JSON
	  res.json(payslip);
  
	  // Send the payslip data to the email API for sending as an attachment
	  const response = await axios.post(`${Api_url}/admin/sendEmail`, payslip);
	  
	} catch (error) {
	  res.status(500).json({ error: 'Failed to fetch payslip' });
	}
  });



router.post("/Login1", async (req, res) => {
	try {
  
		const { error } = validate1(req.body);
    console.log(error);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ Email: req.body.Email });
   
		if (!user)
    
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.Password,
			user.Password
		);
    
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const token = user.generateAuthToken();

		
		res.status(200).send({ data: token, message: "logged in successfully" }
		);
		
	
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



let storedOTP='';

router.post('/sign1',async(req,res)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sales@hubhawks.com',
      pass: 'rkcknmtciawqanpq'
    }
  });
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false });
storedOTP=otp
  // Create the email message
  const mailOptions = {
    from: 'sales@hubhawks.com',
    to: req.body.Email, // Assuming the email is sent in the request body
    subject: 'OTP Verification',
    text: `Your OTP code is: ${otp}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    }
  });

})

router.post('/Otp1',async(req,res)=>{
  const userOTP = req.body.Otp; // Assuming the OTP is sent in the request body

  // Assuming you have stored the generated OTP in a variable or database
  if (userOTP === storedOTP) {
    res.status(200).json({ message: 'OTP verification successful' });
  } else {
    res.status(400).json({ error: 'OTP verification failed' });
  }

})

router.post('/slush',async(req,res)=>{
  const { Name, Email,Password,confirmPassword,  } = req.body;
  try {
    
  

    const { error } = validate({Name, Email,Password,confirmPassword });
    console.log(error, "checking");

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
   
    const user = await User.findOne({ Email: req.body.Email });
 

    if (user) {
      return res.status(409).send({ message: "User with given email already exists!" });
    }

    

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    

    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
  

    const newUser = new User({ ...req.body, Password: hashedPassword });
    await newUser.save();

    

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/api/payslipsu/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		const payslips = await Payslip.find({ user: userId });
	  res.json(payslips);
	} catch (error) {
	  res.status(500).json({ error: 'Failed to fetch payslips' });
	}
  });
router.get('/user/:userId', async (req, res) => {
	try {
	  const userId = req.params.userId; //dynamic value ati h
    
   
	  // Fetch the user data from MongoDB based on the provided user ID
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  // Return the user data as the API response
	  res.json(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });




 router.get('/users/photo/:id', async (req, res) => {
	try {
		
		const id = req.params.id;
		const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Send the user photo data back as a response
    res.send(user.photo);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });


router.post('/users/photo', upload.single('photo'), async (req, res) => {
	try {
		
	  const user = await User.findById(req.body.userId);
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  user.photo = req.file.buffer;
		
	  await user.save();
  
	  res.json(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });

  router.post("/update-password", async (req, res) => {
    const password = req.body.newPassword;

    const email = req.body.user.Email;
    
    try {
      const user = await User.findOne({ email }); 
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Update the password
      await User.updateOne({ email: user }, { $set: { Password: hashedPassword } });
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });


module.exports=router