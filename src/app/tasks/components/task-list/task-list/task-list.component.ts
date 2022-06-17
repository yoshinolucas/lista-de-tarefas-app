import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks/services/tasks.service';
import { TaskModel } from '../../../models/taskmodel';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: TaskModel[];
  errorMsg: string = '';
  constructor(private tasksService: TasksService) { }

   
  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.tasksService.getTasks().subscribe(
     tasks => {
      this.tasks = tasks;
     },
     error => this.errorMsg = <any>error
    );
  }

}
