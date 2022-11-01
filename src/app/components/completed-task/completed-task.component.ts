import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CompletedTask } from '@models/completed-task';
import { Task } from '@models/task';
import { TaskService } from '@services/task.service';  
@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {
  
  @Input() completedTask!: CompletedTask;
  
  task!: Task;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  redoTask() {
  //  Code For Redo Here, configure to SpringBoot
  }


  redoSuccess(response: Record<string, any>){
    Swal.fire('Task Moved', 'Task has been moved to Task List', 'success')
      .then(answer => {
        if(answer.isConfirmed){
          this.router.navigate(['/tasks']);
        }
      });
  }

  redoTaskFailed(response: Record<string, any>) {
    Swal.fire('Failed', 'Error Occured', 'error');
  }

  
  deleteTaskCompleted(completedTask: CompletedTask) {
    this.taskService.deleteCompletedTask(completedTask.id!).subscribe({
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

  refresh(): void {
    window.location.reload();
  }




}
