import { identifierName } from '@angular/compiler';
import { Component, computed, signal, WritableSignal,effect, linkedSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-component/login-component';

interface FrameworkOption {
  id: number;
  name: string;
  version: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
