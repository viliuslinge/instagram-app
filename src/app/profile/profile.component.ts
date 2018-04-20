import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  editable = false;

  constructor(private _uS: UserService) { }

  ngOnInit() {
    this.user = this._uS.getProfileInfo().subscribe(
      user => this.user = user
    );
  }

  toggleName() {
    this.editable = !this.editable;
  }
  saveName() {
    this._uS.updateProfile(this.user.uid, this.user.displayName);
    this.editable = false;
  }

  detectFile(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files;
    const files = selectedFile;

    if (!files || files.length === 0) {
      console.log('No files found');
      return;
    }

    this._uS.uploadProfilePicture(files[0], this.user.uid);
  }

}
