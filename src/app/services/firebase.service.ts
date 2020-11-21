// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Wishes';

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_wish(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_wish() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

/*   update_wish(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  delete_wish(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  } */
}
