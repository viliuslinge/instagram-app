import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardPosts: any;

  constructor(private _afs: AngularFirestore) { }

  ngOnInit() {
    this._afs.collection('posts', ref => ref.where('status', '==', 'active'))
      .valueChanges()
      .subscribe(
        posts => this.dashboardPosts = posts
      );
  }

}
