import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as aplicationInsights from 'applicationinsights';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  aplicationInsights
    .setup('')
    .setAutoCollectConsole(true)
    .setInternalLogging(true, true)
    .setSendLiveMetrics(true)
    .setAutoCollectRequests(true)
    .start();

  const documentBuilder = new DocumentBuilder()
    .setTitle('Payment API')
    .setDescription('Payment API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
