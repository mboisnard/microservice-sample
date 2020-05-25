import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsulClient } from './consul/consul';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as config from '../package.json';

const Client = new ConsulClient();
let OpenAPIDocumentation: OpenAPIObject;

async function bootstrap() {
  const conf = (config as any);
  const app = await NestFactory.create(AppModule);

  const openApiOptions = new DocumentBuilder()
      .setTitle(conf.name)
      .setDescription(conf.description)
      .setVersion(conf.version)
      .build();

  OpenAPIDocumentation = SwaggerModule.createDocument(app, openApiOptions);

  await app.listen(Client.port);
}


Client.register()
    .then(bootstrap)
    .catch(console.error);

export { Client, OpenAPIDocumentation }
