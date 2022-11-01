import { Component, OnInit } from '@angular/core';


import { TaskService } from 'src/app/services/task.service';
import { Task } from '@models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  hasToken: boolean = (localStorage.getItem('token') !== null);
  tasks: Task[] = [];
  noTasks: boolean = true;
  constructor(private taskService: TaskService) { 
    
  }

  ngOnInit(): void {
    this.getTasks();
  }
  
  getTasks() {
    this.taskService.get().subscribe((response: Task[]) => {
      this.tasks = response;

      if(this.tasks.length > 0){
        this.noTasks = false;
      }
    })
  }

}
