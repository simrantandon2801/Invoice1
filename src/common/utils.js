import moment from 'moment';

export const API_ENDPOINT = '/api';

const BasicSalary = 25000;

const calculateAmount = (percentage = 0) => {
  return (BasicSalary * percentage) / 100
}

export const PayslipSampleData = {
  company: {
    icon: null,
    iconUrl: '',
    name: 'Mycompany pvt ltd.',
    address: '250, S-BLock, 27 Street, Adayar, Chennai: 600027'
  },
  employee: {
    name: 'John Deo',
    email: 'johndeo123@gmail.com',
    id: 'emp01',
    position: 'Software Engineer',
    joiningDate: moment('2020-04-08').format(),
    uan: '201017181120',
    accountNumber: '8718927610892',
    pfAccountNumber: 'TN/AAA/00000/000/00000',
    paidDays: 28,
    lopDays: 3
  },
  Amounts: [
    {
      name: 'Website Developement Charges',
      amount: BasicSalary
    },
    {
      name: 'App Development Charges',
      amount: calculateAmount(20)
    },
    {
      name: 'Marketing Compaign',
      amount: calculateAmount(15)
    },
    // {
    //   name: 'Overtime',
    //   amount: calculateAmount(13)
    // },
    // {
    //   name: 'Performance Bonus',
    //   amount: calculateAmount(5)
    // },
  ],
  Taxs: [
    {
      name: 'Sales Tax', // 12% Basic salary
      amount: calculateAmount(12)
    },
    {
      name: 'VAT(Value Edit Tax)', // Tentative tax every month based on your tax saving declaration
      amount: calculateAmount(5)
    },
    // {
    //   name: 'Professional Tax', // Its a state tax applicable in only certain states
    //   amount: 350
    // }
  ],
  discounts: [
    {
      name: 'Early Payment Discount',
      amount: calculateAmount(20),
    },
    // {
    //   name: 'Telephone Reimbursement',
    //   amount: calculateAmount(7),
    // },
    // {
    //   name: 'Leave travel Reimbursement',
    //   amount: calculateAmount(6),
    // },
    {
      name: 'Promotional Discount',
      amount: calculateAmount(2),
    },
    // {
    //   name: 'Special Reimbursement',
    //   amount: calculateAmount(1),
    // },
    // {
    //   name: 'Lunch Reimbursement',
    //   amount: calculateAmount(1),
    // },
  ]
}