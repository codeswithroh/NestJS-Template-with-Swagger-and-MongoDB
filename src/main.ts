import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  app.use(
    '/docs*',
    basicAuth({
      users: { [process.env.SWAGGER_USERNAME]: process.env.SWAGGER_PASSWORD },
      challenge: true,
      unauthorizedResponse: 'Unauthorized',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Template with MongoDB, Swagger and JWT Auth')
    .setDescription(
      'This is the template for NestJS with MongoDB, Swagger and JWT Auth',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
