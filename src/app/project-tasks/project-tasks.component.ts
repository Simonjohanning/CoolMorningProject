import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css'],
})
export class ProjectTasksComponent implements OnInit {

  taskChoice: string = 'desserts';
  constructor() { }

  ngOnInit() {
  }

}
