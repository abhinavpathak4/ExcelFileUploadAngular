import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

constructor(private uploadService : UploadService,private _snackBar: MatSnackBar){}

  file : any;
  flag : boolean = true;
  btnToggle : boolean = true;

  
  selectFile(event : Event){
    this.file = (event.target as HTMLInputElement)?.files?.[0];
    this.btnToggle = false;
  }

  uploadFile(){
    this.flag = false;
    let formData = new FormData();
    formData.append("file",this.file);
    this.uploadService.uploadData(formData);
    this.flag = true; 
    this._snackBar.open("Data Uploaded", "X");
  }
}
