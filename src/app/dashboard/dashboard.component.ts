import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { FeedDetailsComponent } from '../feed-details/feed-details.component';
import { AuthService } from '../core/auth.service';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardPosts: any;
  // ghostPosts: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  constructor(
    private _afs: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private _pS: PostService
  ) { }

  ngOnInit() {
    this.dashboardPosts = this._pS.getAllActivePosts();
  }

  // SITS ATIDARO POPUPA

  openPostDetails(post): void {
    this.dialog.open(FeedDetailsComponent, {
      // data: {
      //   photoURL: post.photoURL,
      //   description: post.description,
      //   created_at: post.created_at,
      //   userUid: post.user_uid,
      //   user: post.user
      // }
      data: post
    });

  }
}
