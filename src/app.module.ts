import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { FirebaseServiceService } from './firebase/firebase-service.service';
import { FirebaseModuleModule } from './firebase/firebase-module.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [HeroModule, FirebaseModuleModule, UserModule],
  controllers: [AppController],
  providers: [AppService, FirebaseServiceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/hero');
  }
}
