import { Module } from '@nestjs/common';
import { FirebaseServiceService } from 'src/firebase/firebase-service.service';

@Module({
  providers: [FirebaseServiceService],
  exports: [FirebaseServiceService],
})
export class FirebaseModuleModule {}
