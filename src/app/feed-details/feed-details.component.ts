import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss']
})
export class FeedDetailsComponent implements OnInit {

  user: any;

  constructor(
    public _uS: UserService,
    public dialogRef: MatDialogRef<FeedDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.user = this._uS.getProfile(this.data.user_uid).valueChanges();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
