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


  finishTaskSuccess(response: Record<string, any>) {
    Swal.fire('Task Finished!', 'Task has been moved to Finish!', 'success')
        .then(callback => {
          if(callback.isConfirmed) {
            this.refresh();
          }
        });
        
    
  }
  finishTaskFailed(response: Record<string, any>){
    let data: Record<string, any> = response['error'];

    Swal.fire('Error', 'Error Occured!', 'error'); 
  }

  
  refresh(): void {
    window.location.reload();
  }

}
