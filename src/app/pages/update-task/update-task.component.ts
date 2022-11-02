import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '@models/task';
import { TaskService } from '@services/task.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task: Task = new Task();
  taskId!: number ;

  previousTask: Task = new Task();

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { 
    
    this.taskId = parseInt(this.router.url.split("/")[3]);
    

  }

  ngOnInit(): void {

    this.taskService.getSingleTask(this.taskId).subscribe({
      next: this.assignTaskValues.bind(this)
    });
  
  }

  onSubmit(): void {
    this.task.id = this.taskId;
    this.task.title = this.task.title!.split('[EDIT]: ')[1];
    this.task.description = this.task.description!.split('[EDIT]: ')[1];

    this.taskService.updateTask(this.task).subscribe({
      next: this.updateTaskSuccess.bind(this),
      error: this.updateTaskFailed.bind(this)
    });
  }
    
  getSingleTask(taskId: number): Observable<Task> {
    return this.taskService.getSingleTask(taskId);
  }


  assignTaskValues(result: Record<string, any> ){
    this.task.id = result['id'];
    this.task.title = '[EDIT]: ' +  result['title'];
    this.task.description = '[EDIT]: ' + result['description'];

  }
  
  updateTaskSuccess(result: Record<string, any>){
      this.router.navigate(['/tasks']);
      Swal.fire({
        position: 'top-end',
        title: 'Your Task has been Updated!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })

  }

  updateTaskFailed(result: Record<string, any>) {
    let data: Record<string, any> = result['error'];

    if(data['result'] !== 'task_updated') {
      Swal.fire('Task Update Failed', 'Failed!', 'error');
    }
  }

}
