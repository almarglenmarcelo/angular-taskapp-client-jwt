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
    console.log(this.taskId)
    

  }

  ngOnInit(): void {

    this.taskService.getSingleTask(this.taskId).subscribe({
      next: this.assignTaskValues.bind(this)
    });
  
  }

  onSubmit(): void {
    this.task.id = this.taskId;

    this.taskService.updateTask(this.task).subscribe({
      next: this.updateTaskSuccess.bind(this),
      error: this.updateTaskFailed.bind(this)
    });
  }
    
  getSingleTask(taskId: number): Observable<Task> {
    return this.taskService.getSingleTask(taskId);
  }

 


  assignTaskValues(result: Record<string, any> ){
    this.previousTask.id = result['id'];
    this.previousTask.title = result['title'];
    this.previousTask.description = result['description'];

  }

  updateTaskSuccess(result: Record<string, any>){

    Swal.fire('Task Updated', 'Task Updated Success!', 'success')
      .then(response => {
        if(response.isConfirmed){
          this.router.navigate(['/tasks']);
        }
      });

  }

  updateTaskFailed(result: Record<string, any>) {
    let data: Record<string, any> = result['error'];

    if(data['result'] !== 'task_updated') {
      Swal.fire('Task Update Failed', 'Failed!', 'error');
    }
  }

}
