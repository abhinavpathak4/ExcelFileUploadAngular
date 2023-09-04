import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  
  private subscription = new Subscription;
  file : any;
  flag : boolean = true;
  btnToggle : boolean = true;
  constructor(private uploadService : UploadService,private _snackBar: MatSnackBar){}

  selectFile(event : Event): void{
    this.file = (event.target as HTMLInputElement)?.files?.[0];
    this.btnToggle = false;
  }

  uploadFile(): void{
    this.flag = false;
    let formData = new FormData();
    formData.append("file",this.file);
    this.uploadService.uploadData(formData).subscribe(
      ((res)=>{
        if(res.status === 200){
          this.uploadService.subject$.next();
          this._snackBar.open("Uploaded","X",{duration:3000})
        }
        else this._snackBar.open("Data uploading Failed","X")
      }),
      (error:HttpErrorResponse) =>{
        console.log(error) 
      }   
    );
    this.flag = true; 
  }
}
