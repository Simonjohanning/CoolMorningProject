import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Project } from '../dataTypes';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  private selectedProject: Project;
  userName: string = '';

  
  constructor(private store: StoreService) {
    this.selectedProject = this.store.projects[0];
   }

  ngOnInit() {
  }

  userJoined(){
    console.log('Parent received user joined event');
    this.userName = 'You';
  }

}
