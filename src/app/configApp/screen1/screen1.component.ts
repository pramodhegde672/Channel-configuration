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

  onSubmit() {
    this.loader = 1;
    let payload = {
      // hotelList: this.hotelList,
    };
    const apiUrl = 'https://adventuro-backend.onrender.com/app-create';

    this.http.put(apiUrl, payload).subscribe(
      (response: any) => {
        this.loader = 0;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  resetValues() {
    this.search = '';
  }

  createRow() {
    this.state = 0;
    this.openDialog('create', 'post');
  }

  editRow(rowData: any) {
    console.log(rowData, 'edit clicked');
    this.openDialog('edit', 'put');
  }

  deleteRow(rowData: any) {
    console.log(rowData, 'delete clicked...hereh!');
    const apiUrl = `https://adventuro-backend.onrender.com/app-delete/${rowData.name}`;

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
