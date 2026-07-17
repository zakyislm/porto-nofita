import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: "us-east-1", // Supabase S3 is always us-east-1
  endpoint: `https://cyyndwixcdxntedsxlpe.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_KEY_ID || "",
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY || "",
  },
});

export async function uploadFile(
  bucket: string,
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Return the public URL
  return `https://cyyndwixcdxntedsxlpe.supabase.co/storage/v1/object/public/${bucket}/${key}`;
}

export async function deleteFile(bucket: string, key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  await s3Client.send(command);
}
