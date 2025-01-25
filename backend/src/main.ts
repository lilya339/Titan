import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { config } from 'dotenv';
import { urlencoded } from 'express';
config({
  path: resolve(__dirname, '../.env'),
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true }));
  app.enableCors();

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
