import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { Firestore, getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Response } from 'express';
import { FirebaseServiceService } from 'src/firebase/firebase-service.service';
// import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  private firestore: Firestore;

  constructor(private readonly firebaseService: FirebaseServiceService) {
    this.firestore = getFirestore();
  }

  async create(createHeroDto: CreateHeroDto, res: Response): Promise<any> {
    try {
      const auth = getAuth();

      createHeroDto['id'] = auth.currentUser.uid;
      await setDoc(
        doc(this.firestore, 'heros', auth.currentUser.uid),
        createHeroDto,
      );
      res.status(201).json({ message: 'Hero created' });
      console.log('hero :>> ', createHeroDto);
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  findAll() {
    return `This action returns all hero`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hero`;
  }

  // update(id: number, updateHeroDto: UpdateHeroDto) {
  //   return `This action updates a #${id} hero`;
  // }

  remove(id: number) {
    return `This action removes a #${id} hero`;
  }
}
