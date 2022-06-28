import { NestFactory } from '@nestjs/core';
import { initializeConnections } from './app.dataSource';
import { AppModule } from './app.module';
export var map;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  initializeConnections();

  await app.listen(3000);
}
bootstrap();
