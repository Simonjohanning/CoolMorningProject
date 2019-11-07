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
