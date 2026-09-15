import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

// Shared by both the local dev entrypoint (src/main.ts) and the Vercel
// serverless entrypoint (api/index.ts) so the two stay in sync.
export function configureApp(app: INestApplication) {
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

  const config = new DocumentBuilder()
    .setTitle('QLHS API')
    .setDescription('Student management API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
