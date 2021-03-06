import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { FileUploadService } from "../../services/file-upload.service";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;
  public imgTemp: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;

        this.user.name = name;
        this.user.email = email;

        Swal.fire("Success", "User updated", "success");
      },
      (err) => {
        Swal.fire("Error", err.error.msg, "error");
      }
    );
  }

  updateImage(file: File) {
    this.imageToUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    this.fileUploadService
      .updatePicture(this.imageToUpload, "users", this.user.uid)
      .then((img) => {
        this.user.img = img;
        Swal.fire("Success", "User image updated", "success");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Image could not be updated", "error");
      });
  }
}
