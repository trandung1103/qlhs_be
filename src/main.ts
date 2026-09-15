import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.FRONTEND_URL });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // Order matters: Nest picks the first filter whose @Catch() type matches.
  // The Prisma-specific filter must be checked before the catch-all fallback.
  app.useGlobalFilters(new PrismaExceptionFilter(), new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
