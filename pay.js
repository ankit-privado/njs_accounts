// paymentPII.js

const customer = {
  fullName: "Rohit Sharma",
  dateOfBirth: "1990-05-15",
  passportNumber: "N1234567",
  driverLicense: "DL-0420110149646",
  bankDetails: {
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",
    creditCard: {
      cardNumber: "4111111111111111",
      expiry: "12/28",
      cvv: "123"
    }
  },
  loginInfo: {
    username: "rohit90",
    password: "Pa$$w0rd123"
  }
};

const employee = {
  employeeId: "EMP-10234",
  fullName: "Neha Verma",
  workEmail: "neha.verma@company.com",
  personalEmail: "nehav123@gmail.com",
  emergencyContact: {
    name: "Raj Verma",
    relation: "Father",
    phone: "+91-9123456780"
  },
  salaryDetails: {
    annualSalary: 1200000,
    taxId: "TAX-IND-998877",
    panNumber: "ABCDE1234F"
  },
  education: {
    university: "Delhi University",
    degree: "B.Tech",
    graduationYear: 2018,
    studentId: "DU-556677"
  },
  digitalAccounts: {
    linkedin: "https://linkedin.com/in/nehaverma",
    github: "https://github.com/nehaverma",
    lastLoginIp: "10.0.0.5"
  }
};

console.log("Customer Sensitive Data:");
console.log(customer);