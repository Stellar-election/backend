import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
      .setTitle("Elections service")
      .setDescription('The Elections Service API Description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(4000);
}
bootstrap();
