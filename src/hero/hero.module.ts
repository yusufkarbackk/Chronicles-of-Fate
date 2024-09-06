import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { FirebaseModuleModule } from 'src/firebase/firebase-module.module';
@Module({
  imports: [FirebaseModuleModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
