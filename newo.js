import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET = "my-pii-bucket";
const KMS_KEY_ID = "arn:aws:kms:us-east-1:123456789:key/test-key";

/* Dummy PII (TEST ONLY) */
const piiData = {
  mnemonic: "John",
  language: "Doe"
};

const body = Buffer.from(JSON.stringify(piiData, null, 2));
const hash = crypto.createHash("sha256").update(body).digest("hex");

await s3.send(
  new PutObjectCommand({
    Bucket: BUCKET,
    Key: "test/pii/user.json",
    Body: body,
    ContentType: "application/json",
    Metadata: {
      "data-classification": "PII",
      "pii-fields": "firstName,lastName,email,phone,ssn,dob",
      "data-hash": hash,
      "compliance": "gdpr-ccpa"
    },
    ServerSideEncryption: "aws:kms",
    SSEKMSKeyId: KMS_KEY_ID
  })
);

console.log("✓ all Test PII uploaded (encrypted)");