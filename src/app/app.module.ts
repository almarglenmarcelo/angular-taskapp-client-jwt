import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { UpdateTaskComponent } from './pages/update-task/update-task.component';
import { FeaturesComponent } from './pages/features/features.component';
import { CompletedTasksComponent } from './pages/completed-tasks/completed-tasks.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';


const appRoutes : Routes = [
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'tasks', component: TasksComponent},
  { path: 'features', component: FeaturesComponent},  
  { path: 'tasks/completed', component: CompletedTasksComponent},  
  { path: 'tasks/add', component: AddTaskComponent},
  { path: 'tasks/update/:taskId', component: UpdateTaskComponent},  
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomePageComponent,
    NavBarComponent,
    TaskComponent,
    TasksComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    FeaturesComponent,
    CompletedTasksComponent,
    CompletedTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
