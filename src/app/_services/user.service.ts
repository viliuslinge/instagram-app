import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../core/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(
    private _aS: AuthService,
    private _afs: AngularFirestore
  ) { }

  getProfileInfo() {
    return this._aS.user;
  }

  getProfile(id: string) {
    return this._afs.doc<any>(`users/${id}`);
  }

  updateProfile(id, displayName) {
    return this.getProfile(id).update({displayName});
  }

  uploadProfilePicture(upload, uid) {
    const storageRef = firebase.storage().ref();
    const imageName = new Date().getTime();
    const uploadTask = storageRef.child(`users/${imageName}`)
      .put(upload);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => {
        upload.progress =
          (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      }, (error) => {
        console.log(error);
      }, () => {
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          this.changeUserProfilePicture(upload, uid);
          return;
        } else {
          console.log('File not uploaded');
        }
      }
    );
  }

  changeUserProfilePicture(upload, uid) {
    return this.getProfile(uid).update({'photoURL': upload.url});
  }
}
