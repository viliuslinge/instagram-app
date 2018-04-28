import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FeedDetailsComponent } from '../feed-details/feed-details.component';
import { AuthService } from '../core/auth.service';
import { PostService } from '../_services/post.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardPosts: any;
  likeComponent: String = 'none';
  // ghostPosts: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  constructor(
    private _afs: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private _pS: PostService,
    private _uS: UserService
  ) { }

  ngOnInit() {
    this.dashboardPosts = this._pS.getAllActivePosts();
  }

  showLikeComponent(event) {
    event.currentTarget.childNodes[1].childNodes[1].style.display = 'block';
  }

  hideLikeComponent(event) {
    event.currentTarget.childNodes[1].childNodes[1].style.display = 'none';
  }

  openPostDetails(post, e): void {
    if (!e.target.classList.contains('like-button')) {
      const dialogRef = this.dialog.open(FeedDetailsComponent, {
        data: post
      });
      dialogRef.afterClosed().subscribe(res => {
      });
    }
  }
}
