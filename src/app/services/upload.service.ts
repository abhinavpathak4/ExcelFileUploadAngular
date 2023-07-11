import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  URL = "http://localhost:8081/product";
  constructor(private http : HttpClient) { }

  uploadData(formData : FormData){
     this.http.post<Products[]>(this.URL+"/upload", formData).subscribe(
      ((data)=>{
        console.log(data);
      }),
      (error:HttpErrorResponse) => {
        console.log(error);
      }   
    )
  }

  getData(){
    return this.http.get<Products[]>(this.URL);
  }
}
