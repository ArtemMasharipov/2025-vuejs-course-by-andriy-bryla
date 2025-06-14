import dotenv from 'dotenv';
dotenv.config();

export default Object.freeze({
  database: {
    name: process.env.DATABASE_NAME,
    url: process.env.MONGODB_URL,
    uri: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION || '60m',
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  },
  server: {
    port: process.env.PORT,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
});
