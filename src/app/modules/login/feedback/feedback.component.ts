import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { bindNodeCallback } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Feedback } from '../../../models/cms.model';
import { FeedbackService } from 'src/app/services/cms/feedback.service';


@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedback: Feedback;
  frmFeedback: FormGroup;


  constructor(private feedbackSvc: FeedbackService,
    private _snackBar: MatSnackBar) {
    this.feedback = new Feedback();
  }


  ngOnInit(): void {
    this.frmFeedback = new FormGroup({
      'fcname': new FormControl(null, Validators.required),
      'fcemail': new FormControl(null, Validators.nullValidator),
      'fcmobile': new FormControl(null, Validators.required),
      'fcmessage': new FormControl(null, Validators.required),
      'fcsubject': new FormControl(null, Validators.required),
    });
  }

  public submitFeedback() {
    console.log(this.feedback);
    this.feedbackSvc.sendFeedback(this.feedback).subscribe(r => {
      this._snackBar.open('Message sent successfully.', "OK", {
        duration: 2000,
      });
      this.frmFeedback.reset()
    }, err => {
      this._snackBar.open("Sorry, something went wrong", "OK", {
        duration: 2000,
      });
      console.error(err)
    })
  }

}
