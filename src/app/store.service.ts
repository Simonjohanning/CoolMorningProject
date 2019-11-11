import { Injectable } from '@angular/core';
import { Project } from './dataTypes';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public projects: Project[] = [
    {
      id: '0',
      title: 'Project 1',
      description: 'This is a text describing project 1',
      goal: 'This project aims to do something cool',
      memberIds: ['member1', 'member2'],
      taskIds: []
    },
    {
      id: '1',
      title: 'Project 2',
      description: 'This is a text describing project 2',
      goal: 'This project aims to do something even cooler',
      memberIds: ['member3', 'member2'],
      taskIds: []
    }
  ]
  constructor() { }
}
