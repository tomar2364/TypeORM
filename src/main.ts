import { NestFactory } from '@nestjs/core';
import { mapDataSource } from './app.dataSource';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  mapDataSource();
  await app.listen(3000);
}
bootstrap();
