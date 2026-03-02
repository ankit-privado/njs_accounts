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

console.log("Customer Sensitive Data:");
console.log(customer);