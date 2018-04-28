import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PostService } from './post.service';
import { UserService } from './user.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

@Injectable()
export class LikeService {

  constructor(
    private _uS: UserService,
    private _pS: PostService
  ) { }


  updateLikeCount(id, like_id) {
    let hasCompleted: Boolean = false;

    this._pS.getOnePost(id).valueChanges().subscribe(
      (post) => {
        if (!hasCompleted) {
          if (like_id.length === 0) {
            this._pS.getOnePost(id).update({ likes: ++post.likes });
          } else {
            this._pS.getOnePost(id).update({ likes: --post.likes });
          }
          hasCompleted = true;
        }
      }
    );
  }

  checkPostLike(id, uid) {
    return this._pS.getOnePost(id).collection('likes', (ref) => ref
      .where('user_uid', '==', `${uid}`))
      .snapshotChanges().map(
        (likes) => {
          return likes.map(
            (like) => {
              const like_id = like.payload.doc.id;
              return like_id;
            }
          );
        }
      );
  }

  createPostLike(id, uid) {
    return this._pS.getOnePost(id).collection('likes').add({ 'user_uid': uid });
  }

  deletePostLike(id, like_id) {
    this._pS.getOnePost(id).collection('likes').doc(like_id).delete()
    .catch(() => console.log('error'));
  }

}



