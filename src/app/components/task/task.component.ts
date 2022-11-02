import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '@models/task';
import { TaskService } from '@services/task.service';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;

  taskId!: number ;
  
  constructor(
    private taskService: TaskService,
    private router: Router
    ) { }

  ngOnInit(): void {
    
  }

  
  
  updateTask(){
   this.router.navigate(['tasks/update/' + this.task.id]);
  }

  finishTask(task: Task){

    this.taskService.completeTask(this.task.id!).subscribe({
        next: this.finishTaskSuccess.bind(this),
        error: this.finishTaskFailed.bind(this)
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id!).subscribe({
      next: this.deleteTaskSuccess.bind(this),
      error: this.deleteTaskFailed.bind(this)
    });
  }


  deleteTaskSuccess(response: Record<string, any>) {
    Swal.fire('Task Deleted!', 'Task has been deleted!', 'success')
        .then(callback => {
          if(callback.isConfirmed) {
            this.refresh();
          }
        });
        
    
  }
  deleteTaskFailed(response: Record<string, any>){
    let data: Record<string, any> = response['error'];

    Swal.fire('Error', 'Error Occured!', 'error'); 
  }





  finishTaskSuccess(response: Record<string, any>) {
    this.router.navigate(['/tasks/completed']);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your Task has been Finished',
      showConfirmButton: false,
      timer: 1000
    });

    setTimeout(() => {
      this.router.navigate(['/tasks']);
    },1000)
        
    
  }
  finishTaskFailed(response: Record<string, any>){
    let data: Record<string, any> = response['error'];

    Swal.fire('Error', 'Error Occured!', 'error'); 
  }

  
  refresh(): void {
    window.location.reload();
  }

}
