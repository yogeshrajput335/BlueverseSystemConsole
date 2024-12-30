import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, AutoCompleteModule, FloatLabelModule,FormsModule,DatePickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'code';
  value1=""
  value2=""
  value3=""
  items=["test","bv"]
  date1:any
  search(event:any){

  }
}
