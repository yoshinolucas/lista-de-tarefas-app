import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, catchError } from 'rxjs';
import * as operators from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TaskModel } from '../models/taskmodel';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private urlApi = `${environment.baseUrl}/api/tasks`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.urlApi)
    .pipe(
      catchError(this.treatError)
      );
  }

  getTask(id: string): Observable<TaskModel> {

    if(id == ''){
      return of(this.InitialTask());
    }

    const url = `${this.urlApi}/${id}`;

    return this.http.get<TaskModel>(url)
    .pipe(
      catchError(this.treatError)
      );

  }

  postTask(task: TaskModel){
    return this.http.post<TaskModel>(this.urlApi, task, { headers: this.jsonHeaders })
    .pipe(
      catchError(this.treatError)
      );

  }

  attTask(task: TaskModel){

    const url = `${this.urlApi}/${task.id}`;

    return this.http.put<TaskModel>(url, task, { headers: this.jsonHeaders })
    .pipe(
      catchError(this.treatError)
      );
  }

  removeTask(id: string){
    const url = `${this.urlApi}/${id}`;

    return this.http.delete<TaskModel[]>(url, { headers: this.jsonHeaders })
    .pipe(
      catchError(this.treatError)
      );
  }

  private treatError(err){
    let errorMsg: string;

    if(err.error instanceof ErrorEvent){
      errorMsg = `Error: ${err.error.message}`;
    }
    else {
      errorMsg = `ErrorApi - StatusCode:${err.status}, desc.: ${err.body.error}`;
    }

    return throwError(errorMsg);
  }

  private InitialTask(): TaskModel {
    return {
      id: null,
      title: null,
      details: null,
      done: null
    }
  }

}
