import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { FeedDetailsComponent } from '../feed-details/feed-details.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardPosts: any;
  ghostPosts: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  users: any;

  constructor(
    private _afs: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this._afs.collection('posts', ref => ref.where('status', '==', 'active'))
      .valueChanges()
      .subscribe(posts => this.dashboardPosts = posts.sort(this.compare));

    this._afs.collection('users')
    .valueChanges()
    .subscribe(
      users => {
        this.users = users;
      }
    );
  }

  compare(a, b) {
    const dataA = a.imageName;
    const dataB = b.imageName;
    let comparison = 0;
    dataA > dataB ? comparison = -1 : comparison = 1;
    return comparison;
  }

  openPostDetails(post): void {
    this.dialog.open(FeedDetailsComponent, {
      data: {
        photoURL: post.photoURL,
        description: post.description,
        userUid: post.user_uid
      }
    });
  }
}
