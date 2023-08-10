import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.css'],
})
export class Screen1Component {
  displayedColumns: string[] = [
    'SrNo',
    'Name',
    'type',
    'createdBy',
    'lastUpdated',
    'actions',
  ];

  dataSource = [];
  // Input Variables
  search: string | undefined;

  // Additional Variables
  loader = 0;
  state = 0;

  _id = "";
  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const apiUrl = 'https://adventuro-backend.onrender.com/app-data';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.dataSource = response;
        // console.log(this.dataSource);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  openDialog(action?: string, method?: string): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(
      DialogComponent,
      {
        data: {
          value: 1,
          action: action,
          method: method,
          _id: this._id
        },
      }
    );

    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      this.fetchData();
    });
  }

  onRowClick(rowData: any) {
    // this.hotelList = rowData.name;
    console.log(rowData);
    this.state = 1;
  }

 

  resetValues() {
    this.search = '';
  }

  createRow() {
    this.state = 0;
    this.openDialog('create', 'post');
  }

  editRow(rowData: any) {
    this._id = rowData._id;
    this.openDialog('edit', 'put');
  }

  deleteRow(rowData: any) {
    this._id = rowData._id;
    const apiUrl = `https://adventuro-backend.onrender.com/app-delete/${rowData._id}`;

    this.http.delete(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchData();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
