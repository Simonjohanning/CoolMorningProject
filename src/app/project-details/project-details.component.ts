import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../dataTypes';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: Project;
  @Output() userJoinEmitter = new EventEmitter<string>();
  private thouShaltNotJoin: boolean;
  private alreadyJoined: boolean = false;
  private motivation: string = '';
  

  constructor() { }

  ngOnInit() {  }

  private askHodor(): boolean{
    return (this.alreadyJoined || (this.motivation.length < 10));
  }

  private join(): void {
    alert('Mess with the best, die like ' + this.project.title);
    this.alreadyJoined = true;
    this.userJoinEmitter.emit('User joined the project');
  }
}
