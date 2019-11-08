import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() name: string;
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
    alert('Mess with the best, die like ' + this.name);
    this.alreadyJoined = true;
    this.userJoinEmitter.emit('User joined the project');
  }
}
