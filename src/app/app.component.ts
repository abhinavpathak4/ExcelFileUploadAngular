import { Component, OnInit } from '@angular/core';
import { UploadService } from './services/upload.service';
import { Products } from './interfaces/products';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private uploadService : UploadService){}
  list : Products[] = [];
  ngOnInit(){
    this.uploadService.getData().subscribe(
      (resp : Products[])=>{console.log('service class',resp); this.list = resp;},
      (error: HttpErrorResponse)=>console.log(error)
      );
  } 
  displayedColumns: string[] = ['id', 'name', 'cost', 'qty'];
}
