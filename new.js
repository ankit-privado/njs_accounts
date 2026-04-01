import {
  S3Client,
  PutObjectCommand,
  PutBucketVersioningCommand,
  PutBucketLifecycleConfigurationCommand
} from "@aws-sdk/client-s3";

import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Secure PII Uploader with encryption & compliance metadata
 */
class SecurePIIUploader {
  constructor(bucketName, region = "us-east-1", kmsKeyId = null) {
    this.bucketName = bucketName;
    this.kmsKeyId = kmsKeyId;
    this.s3Client = new S3Client({ region });
  }

  /**
   * Upload a PII file with encryption & metadata
   */
  async uploadPiiFile(
    filePath,
    objectName = null,
    dataClassification = "PII",
    owner = null,
    retentionDays = null
  ) {
    if (!objectName) {
      objectName = path.basename(filePath);
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const fileHash = this._calculateHash(fileBuffer);

      const metadata = {
        "data-classification": dataClassification,
        "upload-timestamp": new Date().toISOString(),
        "file-hash": fileHash,
        "compliance": "gdpr-ccpa"
      };

      if (owner) metadata["data-owner"] = owner;
      if (retentionDays) metadata["retention-days"] = String(retentionDays);

      const params = {
        Bucket: this.bucketName,
        Key: objectName,
        Body: fileBuffer,
        Metadata: metadata,
        StorageClass: "STANDARD_IA",
        ServerSideEncryption: this.kmsKeyId ? "aws:kms" : "AES256"
      };

      if (this.kmsKeyId) {
        params.SSEKMSKeyId = this.kmsKeyId;
      }

      await this.s3Client.send(new PutObjectCommand(params));

      this._logUpload(objectName, filePath, dataClassification);

      console.log(`✓ Securely uploaded PII file to ${this.bucketName}/${objectName}`);
      console.log(`  - Encryption: ${this.kmsKeyId ? "KMS" : "AES256"}`);
      console.log(`  - File hash: ${fileHash}`);
      return true;

    } catch (err) {
      console.error("✗ Error uploading file:", err.message);
      return false;
    }
  }

  /**
   * Upload PII data directly (JSON, CSV, text)
   */
  async uploadPiiData(
    data,
    objectName,
    dataType = "json",
    dataClassification = "PII",
    owner = null
  ) {
    let body;
    let contentType;

    if (typeof data === "object" && !Buffer.isBuffer(data)) {
      body = Buffer.from(JSON.stringify(data, null, 2));
      contentType = "application/json";
    } else if (typeof data === "string") {
      body = Buffer.from(data);
      contentType = dataType === "csv" ? "text/csv" : "text/plain";
    } else {
      body = data;
      contentType = "application/octet-stream";
    }

    const dataHash = this._calculateHash(body);

    const metadata = {
      "data-classification": dataClassification,
      "upload-timestamp": new Date().toISOString(),
      "data-hash": dataHash,
      "compliance": "gdpr-ccpa",
      "data-type": dataType
    };

    if (owner) metadata["data-owner"] = owner;

    const params = {
      Bucket: this.bucketName,
      Key: objectName,
      Body: body,
      Metadata: metadata,
      ContentType: contentType,
      ServerSideEncryption: this.kmsKeyId ? "aws:kms" : "AES256"
    };

    if (this.kmsKeyId) {
      params.SSEKMSKeyId = this.kmsKeyId;
    }

    try {
      await this.s3Client.send(new PutObjectCommand(params));

      this._logUpload(objectName, "direct_data", dataClassification);

      console.log(`✓ Securely uploaded PII data to ${this.bucketName}/${objectName}`);
      console.log(`  - Encryption: ${this.kmsKeyId ? "KMS" : "AES256"}`);
      console.log(`  - Data hash: ${dataHash}`);
      return true;

    } catch (err) {
      console.error("✗ Error uploading data:", err.message);
      return false;
    }
  }

  /**
   * Enable bucket versioning
   */
  async enableBucketVersioning() {
    try {
      await this.s3Client.send(
        new PutBucketVersioningCommand({
          Bucket: this.bucketName,
          VersioningConfiguration: { Status: "Enabled" }
        })
      );
      console.log(`✓ Versioning enabled on ${this.bucketName}`);
      return true;
    } catch (err) {
      console.error("✗ Error enabling versioning:", err.message);
      return false;
    }
  }

  /**
   * Set lifecycle policy (Glacier + deletion)
   */
  async setBucketLifecycle(daysToGlacier = 90, daysToDelete = 2555) {
    const lifecycleConfig = {
      Rules: [
        {
          ID: "PII-Data-Lifecycle",
          Status: "Enabled",
          Filter: {},
          Transitions: [
            {
              Days: daysToGlacier,
              StorageClass: "GLACIER"
            }
          ],
          Expiration: {
            Days: daysToDelete
          }
        }
      ]
    };

    try {
      await this.s3Client.send(
        new PutBucketLifecycleConfigurationCommand({
          Bucket: this.bucketName,
          LifecycleConfiguration: lifecycleConfig
        })
      );
      console.log(`✓ Lifecycle policy set on ${this.bucketName}`);
      return true;
    } catch (err) {
      console.error("✗ Error setting lifecycle:", err.message);
      return false;
    }
  }

  /**
   * Calculate SHA-256 hash
   */
  _calculateHash(buffer) {
    return crypto.createHash("sha256").update(buffer).digest("hex");
  }

  /**
   * Audit logging
   */
  _logUpload(objectName, source, classification) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      object: objectName,
      source,
      classification,
      bucket: this.bucketName
    };
    console.log(`  - Audit log: ${JSON.stringify(logEntry)}`);
  }
}

export default SecurePIIUploader;

