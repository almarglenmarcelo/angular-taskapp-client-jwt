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
  @Output() oldTask!: Task;

  constructor(
    private taskService: TaskService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  updateTask(){
   this.router.navigate(['tasks/update/' + this.task.id]);
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(this.task.id!).subscribe({
        next: this.deleteTaskSuccess.bind(this),
        error: this.deleteTaskFailed.bind(this)
    });
  }


  deleteTaskSuccess(response: Record<string, any>) {
    Swal.fire('Delete Success', 'Task Deleted!', 'success')
        .then(callback => {
          if(callback.isConfirmed) {
            this.refresh();
          }
        });
    
    
  }
  deleteTaskFailed(response: Record<string, any>){
    let data: Record<string, any> = response['error'];

    if(data['result'] == 'task_not_found'){
      Swal.fire('Delete Failed', 'Task does not exists', 'error');
    }    
  }

  
  refresh(): void {
    window.location.reload();
  }

}