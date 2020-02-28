import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

/**
 * App Imports
 */
import { PORT } from './shared/env-vars';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  logger.log(`Graphql Server is Listening on port ${PORT}`)
}
bootstrap();
