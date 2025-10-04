import { Component, OnInit, signal } from '@angular/core';
import { RecordDto } from '../model/record.dto';
import { Navigation } from '../navigation/navigation';
import { HttpClient } from '@angular/common/http';
import { RecordEdit } from "../record-edit/record-edit";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-record-list',
  imports: [Navigation, RecordEdit],
  templateUrl: './record-list.html',
  styleUrl: './record-list.css'
})
export class RecordList {
   public mockRecords: RecordDto[] = [];

   edit_item_id = signal<string | null>(null);
   
  //  元件建立時，HttpClient 會被注入，所以在建構子裡可以使用
   constructor(private http:HttpClient, private router: Router) {}

    ngOnInit(): void {
      this.loadRecords();
    }

  edit_action(item: RecordDto): void {
    this.edit_item_id.set(item.id!);
  }

  delete_action(record: RecordDto): void {
    console.log('Updating record:', record);
    this.http.post('http://localhost:7276/AngularApi/Remove_record', record,{
    withCredentials: true  })
        .subscribe({
          next: (response:any) => {
              console.log('Delete response:', response);  

            if (response.success) {
             
              this.loadRecords();            // 再重新載入
              alert('記錄刪除成功');
            }
          
          }
        }
        
    );

  }

  On_Save(record: RecordDto) {
    console.log('Updating record:', record);
    this.http.post('http://localhost:7276/AngularApi/Update_Record', record,{
    withCredentials: true  })
        .subscribe({
          next: (response:any) => {
              console.log('Update response:', response);  

            if (response.success) {
              this.edit_item_id.set(null);  // 先關閉編輯模式
              this.loadRecords();            // 再重新載入
              alert('記錄更新成功');
            }
          
          }
        }
        
    );

  }
//待辦 撰寫update 刪除功能，撰寫後台 刪除 API
  On_Cancel() {
    this.edit_item_id.set(null);
    this.loadRecords();
  }

  loadRecords() {
     this.http.get<RecordDto[]>('http://localhost:7276/AngularApi/Get_Records',{withCredentials: true})
    .subscribe({next: (data) => {
       console.log("loadRecords");
        this.mockRecords = data;

      },
      error: (err) => {
        alert('無法取得資料，請稍後再試');
        console.error('Error fetching records:', err);
      }
    });
  }

}
