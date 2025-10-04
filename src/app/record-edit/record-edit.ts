import { Component, inject,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordDto } from '../model/record.dto';



@Component({
  selector: 'record-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './record-edit.html',
  styleUrl: './record-edit.css'
})
export class RecordEdit 

{

  @Input() record!:RecordDto;

  @Output() save = new EventEmitter<RecordDto>();

  @Output() cancel = new EventEmitter<void>();

  private formBuilder = inject(FormBuilder);

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


  Edit_Form = this.formBuilder.group({
    id: this.formBuilder.control<string | null>(null),
    userId: this.formBuilder.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    date: this.formBuilder.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    type: this.formBuilder.control<'income' | 'expense'>('expense', { nonNullable: true, validators: [Validators.required] }),
    amount: this.formBuilder.control<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
    categoryId: this.formBuilder.control<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: this.formBuilder.control<string | null>(null),
    paymentMethod: this.formBuilder.control<string>('' ,{ nonNullable: true })
  });

  ngOnInit() {
    const record_copy = { ...this.record };

    // 處理 date 格式問題，造成無法帶入問題 — 格式是 YYYY-MM-DD
    if (record_copy.date) {
      const d = new Date(record_copy.date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      record_copy.date = `${yyyy}-${mm}-${dd}`;
    }

    this.Edit_Form.patchValue(record_copy);
  }


  On_Save() {
    if (this.Edit_Form.valid) {
      this.save.emit(this.Edit_Form.value as RecordDto);
    }

  }

  On_Cancel() {
    this.cancel.emit();
  }


}
