import { Injectable,signal,inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { RecordDto } from '../model/record.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  public user_name_signal = signal<string>('');
  readonly userName = this.user_name_signal.asReadonly();

  check_submit = signal(false);

  login(data: { username: string ; password: string }) {
    this.check_submit.set(true);
    
    this.http.post('http://localhost:7276/AngularApi', data).subscribe({
      next: (response) => {
        if(response=='success'){
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
          this.user_name_signal.set(data.username);
        }
        else{
          alert('登入失敗，請檢查帳號密碼');
        }
      },
      error: () => { console.error('Login failed'); },
      complete: () => {
        this.check_submit.set(false);
      }
    });

  }
}
