import { Component, OnInit } from '@angular/core';



import { TaskService } from '@services/task.service';
import { CompletedTask } from '@models/completed-task';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {


  completedTasks!: CompletedTask[];

  noCompletedTasks: boolean = true;

  constructor(
      private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  getCompletedTasks(): void {

    this.taskService.getCompletedTasks().subscribe((data: CompletedTask[]) => {
      this.completedTasks = data;
      
      if(this.completedTasks.length > 0){
        this.noCompletedTasks = false;
      }

    });
    
  }


}
