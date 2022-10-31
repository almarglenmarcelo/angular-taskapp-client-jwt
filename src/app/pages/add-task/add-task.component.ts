import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '@models/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();


  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.taskService.createTask(this.task).subscribe({
      next: this.createTaskSuccess.bind(this),
      error: this.createTaskFailed.bind(this)
    });
  }

  createTaskSuccess(response: Record<string, any>) {
    Swal.fire('Task Added', 'Task Created Successfully', 'success').then(result => {
      if(result.isConfirmed) {
        this.router.navigate(['tasks']);
      }
    });
  }
  createTaskFailed() {
    Swal.fire('Failed', 'Task Creation Failed', 'error');
  }

}
