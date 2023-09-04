import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadService } from './services/upload.service';
import { Products } from './interfaces/products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  list: Products[] = [];
  displayedColumns: string[] = ['id', 'name', 'cost', 'qty'];
  private subscription: Subscription = new Subscription();

  constructor(private uploadService: UploadService, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProductsData();
    this.subscription = this.uploadService.getSubject$().subscribe(() => this.getProductsData() );
  }

  getProductsData(): void{
      this.uploadService.getData().subscribe(
        (data) => this.list = data,
        (error: HttpErrorResponse) => {
          this._snackBar.open("Error fetching data", "X");
        });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
