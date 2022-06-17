import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './tasks/components/task-list/task-list/task-list.component';
import { TaskRegisterComponent } from './tasks/components/task-register/task-register/task-register.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/register', component: TaskRegisterComponent },
  { path: 'tasks/:id/edit', component: TaskRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
