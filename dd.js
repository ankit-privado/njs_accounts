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

const profile = {
  personalInfo: {
    fullName: "Priya Singh",
    gender: "Female",
    bloodGroup: "O+",
    aadhaarNumber: "1234-5678-9012",
    voterId: "ABC1234567"
  },
  healthInfo: {
    medicalRecordId: "MR-90876",
    insurancePolicyNumber: "INS-5678901234",
    allergies: ["Peanuts", "Dust"],
    currentMedication: "Paracetamol"
  },
  biometricData: {
    fingerprintId: "FP-11223344",
    retinaScanId: "RET-99887766"
  },
  deviceInfo: {
    macAddress: "00:1B:44:11:3A:B7",
    deviceId: "DEVICE-778899",
    imei: "356789012345678"
  },
  locationData: {
    latitude: 23.3441,
    longitude: 85.3096
  }
};

console.log("Advanced PII Data:");
console.log(profile);

console.log("User PII Data:");
console.log(user);
