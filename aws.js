const aws = require('aws-sdk');
import boto3

var firstName = "lll";

var s3 = new aws.S3({
   accessKeyId: "key",
   secretAccessKey: "key",
   bucket: "mera.bucket.com",
   region: firstName
});

var another_service = new aws.S3("anything");

boto3.upload_file(
   filename = "anything",
   Bucket = "mera-bucket",
   Key = "key"
)

const Analytics = require('analytics-node');

// Initialize the Analytics client
const analytics = new Analytics('YOUR_WRITE_KEY'); // Replace with your actual write key

// Send an identify call
analytics.identify({
  userId: pii.adId,        // Equivalent of pii.getAdId()
  traits: parameters       // Object of traits
});
