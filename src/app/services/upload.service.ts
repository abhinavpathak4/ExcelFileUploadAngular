import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  subject$ = new Subject<void>();
  URL = "http://localhost:8081/product";
  constructor(private http : HttpClient) { }

  getSubject$() {
    return this.subject$.asObservable();
  }

  uploadData(formData : FormData) : Observable<HttpResponse<String>>{
    return this.http.post(this.URL+"/upload", formData, {observe : 'response', responseType: 'text'});
  }

  getData(){
    return this.http.get<Products[]>(this.URL);
  }
}
