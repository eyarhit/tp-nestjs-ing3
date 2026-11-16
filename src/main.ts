import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>('PORT') ?? '8000');

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}

await bootstrap();