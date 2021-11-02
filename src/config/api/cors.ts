import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const production = [/\.eqi\.life$/];

const development = ['http://localhost:3001'];

export const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? production : development,
};
