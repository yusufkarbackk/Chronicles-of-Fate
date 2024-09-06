import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModuleModule } from 'src/firebase/firebase-module.module';

@Module({
  imports: [FirebaseModuleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
