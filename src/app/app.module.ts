import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectTeamComponent } from './project-team/project-team.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { StartersComponent } from './starters/starters.component';
import { EntreesComponent } from './entrees/entrees.component';
import { DessertsComponent } from './desserts/desserts.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectViewComponent,
    ProjectDetailsComponent,
    ProjectTeamComponent,
    TeamMemberComponent,
    ProjectTasksComponent,
    StartersComponent,
    EntreesComponent,
    DessertsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
