import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.css'],
})
export class Screen2Component {
  displayedColumns: string[] = ['SrNo', 'name', 'desc', 'icons'];
  options: string[] = ['Hotels', 'Trains', 'Flights'];
  criteriaOptions: string[] = ['<', '>', '='];
  intervalOptions: string[] = ['Seconds', 'Minutes', 'Hours'];

  dataSource = [];
  // Input Variables
  hotelList: string | undefined;
  selectedCategory: string | null = null;
  criteriaInput1: string | undefined;
  criteriaInput2: string | undefined;
  criteria: string | undefined;
  refreshInterval: number | undefined;
  refreshIntervalOption: string | undefined;

  // Additional Variables
  loader = 0;
  state1 = 0;

  _id = "";

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const apiUrl = 'https://adventuro-backend.onrender.com/channels-list';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.dataSource = response;
        console.log(this.dataSource);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  
  openDialog(value: number, action: string, method: string): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(
      DialogComponent,
      {
        data: {
          value: value,
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
    this.hotelList = rowData.name;
    this.state1 = 1;
  }

  onSubmit() {
    this.loader = 1;
    let payload = {
      hotelList: this.hotelList,
      selectedCategory: this.selectedCategory,
      criteriaInput1: this.criteriaInput1,
      criteriaInput2: this.criteriaInput2,
      criteria: this.criteria,
      refreshInterval: this.refreshInterval,
      refreshIntervalOption: this.refreshIntervalOption,
    };
    const apiUrl =
      'https://adventuro-backend.onrender.com/channel-filter-criteria';

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
    this.hotelList = '';
    this.selectedCategory = '';
    this.criteriaInput1 = '';
    this.criteriaInput2 = '';
    this.criteria = '';
    this.refreshInterval = undefined;
    this.refreshIntervalOption = '';
  }

  editRow(rowData: any) {
    this._id = rowData._id;
    this.openDialog(3,'edit','put')
  }

  deleteRow(rowData: any) {
    console.log(rowData, 'delete clicked...hereh!');
    const apiUrl = `https://adventuro-backend.onrender.com/channel-delete/${rowData._id}`;

    this.http.delete(apiUrl).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchData();
        this.state1 = 0;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
