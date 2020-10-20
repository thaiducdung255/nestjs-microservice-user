import { NestFactory } from '@nestjs/core'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3727,
        retryAttempts: 10,
        retryDelay: 5000
      }
    })

  await app.listen(() => process.stdout.write('User microservice is online \n'))
}

bootstrap();
