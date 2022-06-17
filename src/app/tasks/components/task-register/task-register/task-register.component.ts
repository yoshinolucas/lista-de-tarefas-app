import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/tasks/models/taskmodel';
import { TasksService } from 'src/app/tasks/services/tasks.service';

@Component({
  selector: 'app-task-register',
  templateUrl: './task-register.component.html',
  styleUrls: ['./task-register.component.css']
})
export class TaskRegisterComponent implements OnInit, OnDestroy {

  public errorMsg: string = '';
  pageTitle: string = 'Add Task';
  formMode: string;
  taskForm: FormGroup;
  task: TaskModel;
  validationMessages: {[Key: string]: {[key: string]: string}}
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService
    

    ) {
      this.validationMessages = {
        title: {
          required: 'Title is required',
          minLength: 'Min 4',
          maxLength: 'Max 30',
        },
        details: {
          minLength: 'Min 4',
          maxLength: 'Max 80',
        }
      }
     }
 
  ngOnInit() {
    this.formMode = 'new';
    this.taskForm = this.fb.group({
      title:['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      details:['',[Validators.minLength(3), Validators.maxLength(80)]],
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
  
        if(id == null || id == '') {
          const task: TaskModel = { id: "", title: "", details: "" };
          this.seeTask(task);
        }
        else {
          this.getTask(id);
        }
      });
  }

  
  

  ngOnDestroy(): void {
    
  }


  getTask(id: string): void{
     this.tasksService.getTask(id).subscribe(
      (task: TaskModel) => this.seeTask(task),
      (error: any) => this.errorMsg = <any>error
     )
  }

  seeTask(task: TaskModel): void {
     if(this.taskForm){
      this.taskForm.reset();
     }

     this.task = task;

     if(this.task.id == ''){
      this.pageTitle = 'Add Task';
     } else {
      this.pageTitle = `Edit task: ${this.task.title}`;
     }

     this.taskForm.patchValue({
      title: this.task.title,
      details: this.task.details
     });
  }

  deleteTask(): void{
    if (this.task.id == '') {
      this.onSaveComplete();
    }
    else {
      if(confirm(`Are you sure you want to delete the task: ${this.task.title}?`)) {
        this.tasksService.removeTask(this.task.id)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMsg = <any>error
        );
      }
    }
  }

  saveTask(): void{
    if (this.taskForm.valid){
      if(this.taskForm.dirty) {
        const t = {...this.task, ...this.taskForm.value};

        if(t.id === '') {
          this.tasksService.postTask(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error:any) => this.errorMsg = <any>error
            );
        } else {
          this.tasksService.attTask(t)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMsg = <any>error
          );

        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMsg = 'Something Wrong.';
    }

  }

  onSaveComplete(): void{
    this.taskForm.reset();
    this.router.navigate(['/tasks']);
  }
}
