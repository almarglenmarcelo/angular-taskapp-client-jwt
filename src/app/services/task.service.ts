import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { Task } from '@models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService  } from './session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string = environment.apiUrl + '/tasks'
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${this.sessionService.getToken()}`
  });

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) { }
  
  get(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, {headers: this.httpHeaders});
  }
  
  getSingleTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(this.baseUrl + `/${taskId}`, {headers: this.httpHeaders});
  }

  createTask(task: Task): Observable<Object> {
    return this.http.post(this.baseUrl, task, {headers: this.httpHeaders});
  }

  completeTask(id: number): Observable<Object> {
    return this.http.post(this.baseUrl + '/complete', { id }, {headers: this.httpHeaders});
  }

  updateTask(task: Task): Observable<Object> {
      return this.http.put(this.baseUrl, task, {headers: this.httpHeaders});
  }

  deleteTask(taskId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + `/${taskId}`, {headers: this.httpHeaders});
  }

}
