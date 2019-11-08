import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit, OnChanges {

  teamMembers: string[] = ['Tick', 'Trick', 'Track'];
  @Input() newUser:string;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.newUser !== ''){
      this.teamMembers.push(this.newUser);
    }
  }

}
