import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  private projectName: string = 'Cool Project';
  userName: string = '';
  constructor() { }

  ngOnInit() {
  }

  userJoined(){
    console.log('Parent received user joined event');
    this.userName = 'You';
  }

}
