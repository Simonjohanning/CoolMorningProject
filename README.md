CoolAfternoonProject

Create a new angular workspace through
```
ng new CoolAfternoonProject
```

Create the hosting component the projectView lives in:
```
ng generate component projectView
```

and include it in the app component
```
<app-project-view></app-project-view>
```

We want the projectView to contain the project details component, the team component and the tasks component.
The project view component hosts the other components and has the project information with it (for now just a string for its name).
We don't want to include the toolbar, but want to provide a context that can interact with all relevant components, that we want to include the project name (that is in the toolbar component in the relevant view)

```
private projectName: string;
```

Now we want the view to display the name of the project.
Since it is a string, we want interpolation:
```
{{projectName}}
```

The projectView has three components, lets start with the details component:
```
ng generate component projectDetails
<app-project-details></app-project-details>
```

The project details have some structure and look as follows:
```
<h2>Project Name</h2>
<p>Some project text</p>
<h4>Goal</h4>
<p>Some more text</p>
<button class="button">Join</button>
</div>
```

We want project name to be taken from the parent component: Input
```
Child: @Input() name: string;
Parent: [name]="projectName"
```

Lets take care of the button doing something when clicking, by acknowledging your click
```
HTML: (click)="join()"
TS: private join(): void{
        alert('Mess with the best, die like '
      }
```

Now lets give the user feedback for the success of joining the project
```
private thouShaltNotPass = false;

In join:
this.thouShaltNotPass = true;
```


Lets also reflect that in the button: disable after joining: property binding
```
<button class="button" (click)="join()" [disabled]="thouShaltNotPass">Join</button>
```

Finally, lets make the user tell the project people why the want to join: [(ngModel)]
For this we need to import the forms module in the app module:
``` 
import { FormsModule } from '@angular/forms';
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ]
```

in the app.module.
Now we are ready for the two-way binding:
```
<input [(ngModel)]="motivation">
<div>
    Your motivation to join: {{motivation}}
</div> 
```

Lets make sure the user writes at least 10 characters in the motivation in order to allow them.
```
if(this.motivation.length < 10){
      this.thouShaltNotPass = true;
    }
```

Also make sure that user needs to write more when they don't write enough, that they are ready to join and they have joined the project.
For this, make the userFeedback more dynamic, and check if something changed:
```
private motivationChange() {
    this.thouShaltNotPass = this.joined || (this.motivation.length < 10);
  }
```

This, however, doesn't change the status when the user joined and thus needs to be included in there as well
```
private join(): void {
    alert('Mess with the best, die like ' + this.name);
    this.alreadyJoined = true;
  }
```
 
Hide the button when the motivation is not sufficient:
```
<button class="button" (click)="joinProject()" [disabled]="thouShaltNotPass">Join</button>
```

There is a better way to do this: bind a method for checking the user join status in a method:
```
  private askHodor(): boolean{
    return (this.alreadyJoined || (this.motivation.length < 10));
  }
  <button (click)="join()" [disabled]="askHodor()">Join</button>
```

This concludes the thursday lesson; the following is for the friday lesson.

The Friday lesson started with finishing up with data flow between components. As the @Input() decorator was addressed in the Thursday lesson, its 'counterpart', @Output() was introduced

```
In the ProjectDetailComponent:
@Output() userJoinEmitter = new EventEmitter<string>();
private join(): void {
    alert('Mess with the best, die like ' + this.name);
    this.alreadyJoined = true;
    this.userJoinEmitter.emit('User joined the project');
  }
```

This emits an event when the user joined that is raised in the template of the parent component (ProjectView).
The child component tag within the HTML of the parent component looks as follows:
```
<app-project-details [name]="projectName" (userJoinEmitter)="userJoined($event)"></app-project-details>
```

The emitter is bound to the userJoined method of the ProjectView component, which is detailed as follows:
```
  userJoined(){
    console.log('Parent received user joined event');
  }
```

Next, we deleted the join button in the project detail component in order to not confuse the user about an unuable and unnecessary button. For this we used the NgIf directive:

```
<div *ngIf="!alreadyJoined">
        <button (click)="join()" [disabled]="askHodor()">Join</button>
    </div>
```

This concludes our work on the Project Detail component and we looked at the team and task component. For this, we create the project team and team member component:
```
ng generate component ProjectTeam
ng generate component TeamMember
```

We want to include these components hierarchically in the Project view component:
```
ProjectView:
<app-project-team></app-project-team>
ProjectTeam:
<app-team-member></app-team-member>
```

We want the project team to have members, so we create an array of the members in the team component:
```
teamMembers: string[] = ['Tick', 'Trick', 'Track'];
```

We next learn about the NgFor directive, which 'replicates' the respective element for every element in the list/array (in this case the teamMembers array). 
It creates a local template variable that is valid within the scope of the component in the template:
```
<app-team-member *ngFor="let member of teamMembers" [memberName]="member"></app-team-member>
```

The member local template variable is bound to the memberName property of the team member component, and needs to be included through the Input directive of the team member component:
```
@Input() memberName: string;
```

with the memberName shown through an interpolation in the respective template:
```
{{memberName}}
```

We now want the user to be able to join the project team, i.e. we need to add some value that we defined in the project view component to the array in the team component.
For this we create another input directive for  the project team component:
```
@Input() newUser:string;
```
and let the component listen to any changes. When the name of the user is set (changes from the empty string to a more meaningful one), it triggers a change that is detected through the NgOnChanges change detector (that implements the OnChanges interface):
```
export class ProjectTeamComponent implements OnInit, OnChanges {
ngOnChanges(){
    if(this.newUser !== ''){
      this.teamMembers.push(this.newUser);
    }
  }
```

with the project view component being as follows (template and ts):
```
<app-project-team [newUser]="userName"></app-project-team>
userName: string = '';
userJoined(){
    console.log('Parent received user joined event');
    this.userName = 'You';
  }
```

This allows us to add new users to the project view and we can focus on the last component, the task list. For this we generate the task list component, as well as the starters, main and desserts component:
```
ng generate component ProjectTasks
ng generate component Starters
ng generate component Main
ng generate component Desserts
```

and relate them hierarchically to one another:
```
ProjectView:
<app-project-tasks></app-project-tasks>
ProjectTasks:
<app-starters></app-starters>
<app-main></app-main>
<app-desserts></app-desserts>
```

In order to selectively show these components based on the value of a property (e.g. which one to select), we use the NgSwitch directive by wrapping them into an HTML element:
```
<div [ngSwitch]="taskChoice">
<app-starters></app-starters>
<app-main></app-main>
<app-desserts></app-desserts>
</div>
```

This selects components that are annotated with the correct *ngSwitchCase binding to be included in the DOM. For this, the taskChoice property is set and the switch cases are put into the menu items:
```
taskChoice: string = 'desserts';
<app-starters *ngSwitchCase="'starters'"></app-starters>
<app-main *ngSwitchCase="'mains'"></app-main>
<app-desserts *ngSwitchCase="'desserts'"></app-desserts>
```

Finally, we want to be able to switch between the components that are rendered by using html elements that change the taskChoice property by clicking on them:
```
    <div (click)="taskChoice = 'starters'">Starters</div>
    <app-starters *ngSwitchCase="'starters'"></app-starters>
    <div (click)="taskChoice = 'mains'">Mains</div>
    <app-main *ngSwitchCase="'mains'"></app-main>
    <div (click)="taskChoice = 'desserts'">Desserts</div>
    <app-desserts *ngSwitchCase="'desserts'"></app-desserts>
```#   C o o l M o r n i n g P r o j e c t  
 