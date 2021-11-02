import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV,
  url: process.env.API_URL,
  port: process.env.API_PORT,
}));
