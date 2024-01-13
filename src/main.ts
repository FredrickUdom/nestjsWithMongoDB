import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PROJECT_PORT;
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:3000'
  }),
  
  await app.listen(port, ()=>console.log(`project listening on port: ${port}`));
}
bootstrap();
