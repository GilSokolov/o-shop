import { Injectable } from '@angular/core';
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AppUser } from 'shared/models/app-user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersCollection: AngularFirestoreCollection<AppUser>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = this.db.collection<AppUser>('users');
  }

  save(user: User) {
    const userDetails: AppUser = {
       name: user.displayName,
       email: user.email,
       id: user.uid
    };

    this.getById(user.uid).set(userDetails, { merge: true }).catch(console.log);
  }

  getById(id: string): AngularFirestoreDocument<AppUser> {
    return this.usersCollection.doc(id);
  }
}
