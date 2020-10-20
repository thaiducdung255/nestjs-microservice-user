import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerMiddleware } from './common/middleware/loger.middleware'

const mongoConfigs = {
  useCreateIndex: true,
  useFindAndModify: false
}

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest', mongoConfigs), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
