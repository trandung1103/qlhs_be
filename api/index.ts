import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/bootstrap';

const server = express();
let bootstrapPromise: Promise<void> | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  configureApp(app);
  await app.init();
}

export default async function handler(req: Request, res: Response) {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap().catch((err) => {
      bootstrapPromise = null;
      throw err;
    });
  }
  await bootstrapPromise;
  server(req, res);
}
