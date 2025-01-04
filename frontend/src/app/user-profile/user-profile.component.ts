import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData: any = null;
  @Output() editModeChange = new EventEmitter<boolean>();

  isEditMode: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (!this.userData) {
      this.loadUserData();
    }
  }

  loadUserData() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editModeChange.emit(this.isEditMode);
  }

  saveChanges(updatedData: any) {
    this.userService.updateUserData(updatedData).subscribe(data => {
      this.userData = data;
      this.toggleEditMode();
    });
  }
}
