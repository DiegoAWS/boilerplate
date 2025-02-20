

export async function GET() {
    const envVars = {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_MINIO_URL: process.env.NEXT_PUBLIC_MINIO_URL,
      NEXT_PUBLIC_MINIO_ACCESS_KEY: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
      NEXT_PUBLIC_MINIO_SECRET_KEY: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
      NEXT_PUBLIC_MINIO_BUCKET: process.env.NEXT_PUBLIC_MINIO_BUCKET,
      NEXT_PUBLIC_MINIO_REGION: process.env.NEXT_PUBLIC_MINIO_REGION,
      NEXT_PUBLIC_MINIO_S3_ENDPOINT: process.env.NEXT_PUBLIC_MINIO_S3_ENDPOINT,
      API_KEY: process.env.API_KEY,
      JWT_SECRET: process.env.JWT_SECRET,
    };
  
    return Response.json({
      message: 'Environment variables',
      environment: envVars,
    });
  }
