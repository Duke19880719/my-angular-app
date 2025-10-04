import { Component, Inject, inject, signal } from '@angular/core';
import { LoginService } from '../service/login-sevice';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecordDto } from '../model/record.dto';

import { HttpClient } from '@angular/common/http';

import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-record-add',
  imports: [CommonModule, ReactiveFormsModule, Navigation],
  templateUrl: './record-add.html',
  styleUrl: './record-add.css'
})
export class RecordAdd {
public loginservice = inject(LoginService);

check_submit = signal(false);

private fb = inject(FormBuilder);

private http = inject(HttpClient);

public expenseCategories: string[] = [
  '餐飲',
  '交通',
  '薪水',
  '住房',
  '醫療',
  '娛樂',
  '教育',
  '購物',
  '儲蓄',
  '保險',
  '稅務',
  '其他'
];

public pay_method: string[] = [
  '現金',
  '信用卡',
  '行動支付',
  '銀行轉帳',
  '其他'
];

RecordAddForm = this.fb.group({
  id: this.fb.control<string | null>(null),
  userId: this.fb.control<string>(this.loginservice.user_name_signal()||'test-user', { nonNullable: true, validators: [Validators.required] }),
  date: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
  type: this.fb.control<'income' | 'expense'>('expense', { nonNullable: true, validators: [Validators.required] }),
  amount: this.fb.control<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
  categoryId: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] }),
  description: this.fb.control<string | null>(null),
  paymentMethod: this.fb.control<string>('' ,{ nonNullable: true })
});

  onSubmit() {
    if (this.RecordAddForm.valid) {
      const record: RecordDto = this.RecordAddForm.getRawValue();  
      console.log('Submitting record:', record);

      this.http.post('http://localhost:7276/AngularApi/RecordAdd', record,{
    withCredentials: true}).subscribe({
        next: (response:any) => {
          if(response.success){
            alert('新增成功');
            this.RecordAddForm.reset({
              id: null,
              userId: this.loginservice.user_name_signal(),
              date: '',
              type: 'expense',
              amount: 0,  
              categoryId: '',
              description: '',
              paymentMethod: ''
            });
          }
          else{
            alert('新增失敗，請稍後再試');
          }
        },
        error: () => { console.error('Record submission failed'); },
        complete: () => {
          this.check_submit.set(false);
        }
      });

      // 在這裡可以呼叫服務來處理新增紀錄的邏輯
    } else {
      console.log('Form is invalid');
    } 

  }

}
//撰寫使用者 登入傳值，帶到頁面，用service + signal 實作