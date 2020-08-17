import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField: FormControl;

  constructor() {

    //validador del form del footer
    this.emailField = new FormControl('jesus@jesus.com', [
      Validators.required,  
      Validators.email
    ]);
    this.emailField.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  ngOnInit() {
  }


  sendMail(){
    if(this.emailField.valid){
      console.log("enviando mail chuli a :"+ this.emailField.value);
    }
  }
}
