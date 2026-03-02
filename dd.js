// samplePII.js

const user = {
  firstName: "Ankit",
  lastName: "Kumar",
  ssn: "123-45-6789",
  email: "ankit.kumar@example.com",
  phone: "+91-9876543210",
  address: {
    street: "123 Main Street",
    city: "Ranchi",
    state: "Jharkhand",
    pinCode: "834001",
    country: "India"
  },
  ipAddress: "192.168.1.1"
};

console.log("User PII Data:");
console.log(user);
