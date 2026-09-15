import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

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
  // Vercel's serverless build doesn't bundle swagger-ui-dist's static assets,
  // so load them from a CDN instead of the local files @nestjs/swagger defaults to.
  const swaggerUiVersion = '5.17.14';
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl: `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerUiVersion}/swagger-ui.css`,
    customJs: [
      `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerUiVersion}/swagger-ui-bundle.js`,
      `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${swaggerUiVersion}/swagger-ui-standalone-preset.js`,
    ],
  });
}
