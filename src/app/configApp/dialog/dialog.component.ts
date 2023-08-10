import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  name: string | undefined;
  desc: string | undefined;
  loader = 0;

  dialogTitle: string = '';

  dynamicList: any = [];
  onSubmitData: any = {};

  prefixPath: any = '';
  suffixPath: any = '';

  pathName: any = '';
  reqMethod: any = '';

  _id = "";
  dropdownOptions = [
    {
      label: "Normal",
      value: "Normal"
    },
    {
      label: "Intent",
      value: "Intent"
    }
  ]

  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    console.log(this.data);

    if (this.data.value === 1) {
      this.prefixPath = 'app';
      this.dynamicList = [
        {
          label: 'Name',
          accessor: 'name',
          value: '',
        },
        {
          label: 'Type',
          accessor: 'type',
          dropDown: true,
          value: '',
        },
        {
          label: 'Created By',
          accessor: 'createdBy',
          value: '',
        },
        {
          label: 'Last Updated',
          accessor: 'lastUpdated',
          value: '',
        },
      ];
    } else if(this.data.value === 2){
      this.prefixPath = 'channel';
      this.suffixPath = console.log('from channels');
      this.dialogTitle = 'Create Channel';
      this.dynamicList = [
        {
          label: 'Name',
          accessor: 'name',
          value: '',
        },
        {
          label: 'Description',
          accessor: 'desc',
          value: '',
        },
      ];
    }
    else if(this.data.value===3){
      this.prefixPath = 'channel';
      this.suffixPath = console.log('from channels');
      this.dialogTitle = 'Edit Channel';
      this.dynamicList = [
        {
          label: 'Name',
          accessor: 'name',
          value: '',
        },
        {
          label: 'Description',
          accessor: 'desc',
          value: '',
        },
      ];
    }
    this.suffixPath = this.data.action;

    this.pathName = this.prefixPath + '-' + this.suffixPath;
    this.reqMethod = this.data.method;

    this._id = this.data._id;   
  }

  saveValue(item: any) {
    this.onSubmitData[item.accessor] = item.accessor;
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.dialogClosed.emit();
  }

  updateItemValue(item: any, event: any) {
    item.value = event.value;
  }

  onSubmit() {
    this.loader = 1;

    this.dynamicList.forEach((item: any) => {
      this.onSubmitData[item.accessor] = item.value;
    });
    this.onSubmitData['_id'] = this._id; 
    console.log(this.onSubmitData,'data is herre sdnjnks');
    let URL = `https://adventuro-backend.onrender.com/${this.prefixPath}-${this.suffixPath}`;
    this.makeDynamicRequest(URL, this.reqMethod, this.onSubmitData);
  }

  makeDynamicRequest(url: any, method: any, payload: any): void {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data:
        this.reqMethod === 'post' || this.reqMethod === 'put'
          ? payload
          : undefined,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        // this.dataSource = response;
        this.loader = 0;
        this.closeDialog();
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
