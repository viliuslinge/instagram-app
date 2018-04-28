import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { LikeService } from '../../_services/like.service';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  @Input() data: any;

  post: any;
  like_id: any[] = [];
  user: any;

  constructor(
    public _auth: AuthService,
    private _lS: LikeService,
    private _pS: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.post = this._pS.getOnePost(this.data.id).valueChanges();
    this._auth.user.subscribe( user => {
      this.user = user;
      this._lS.checkPostLike(this.data.id, this.user.uid).subscribe(id => {
        this.like_id = id;
      });
    });
  }

  addLike() {
    this._lS.createPostLike(this.data.id, this.user.uid);
    this._lS.updateLikeCount(this.data.id, this.like_id);
  }

  deleteLike() {
    this._lS.deletePostLike(this.data.id, this.like_id[0]);
    this._lS.updateLikeCount(this.data.id, this.like_id);
  }

}
