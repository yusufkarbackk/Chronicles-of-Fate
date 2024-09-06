import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, Firestore, getDoc, getFirestore } from 'firebase/firestore';
import { Response } from 'express';
import { FirebaseServiceService } from 'src/firebase/firebase-service.service';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private firestore: Firestore;
  constructor(private readonly firebaseService: FirebaseServiceService) {
    this.firestore = getFirestore();
  }

  async create(createUserDto: CreateUserDto, res: Response): Promise<any> {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        `${createUserDto.username}@cfo.com`,
        createUserDto.password,
      );
      await updateProfile(auth.currentUser, {
        displayName: createUserDto.username,
      });
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      const errorMessage = error.message;
      return res.status(400).json({ message: errorMessage });
    }
  }

  async logout(res: Response): Promise<any> {
    try {
      const auth = getAuth();
      if (auth.currentUser === null) {
        return res.status(400).json({ message: 'you are not logged in' });
      } else {
        await signOut(auth);
        return res.status(201).json({ message: 'logout success' });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(createUserDto: CreateUserDto, res: Response): Promise<any> {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(
        auth,
        `${createUserDto.username}@cfo.com`,
        createUserDto.password,
      );
      const user = auth.currentUser;

      const docRef = doc(this.firestore, 'heros', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return res.status(200).json({
          userID: user.uid,
          username: user.displayName,
          hero: docSnap.data(),
        });
      } else {
        return res.status(404).json({ message: 'hero not created' });
      }
    } catch (error) {
      const errorMessage = error.message;
      return res.status(400).json({ message: errorMessage });
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
