import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskCategory, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  taskForm: FormGroup;

  categories = Object.values(TaskCategory);

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.taskForm = this.formBuilder.group({
      title: [''],
      description: [''],
      category: [TaskCategory[0]],
      deadline: [null],
      isDone: false
    })
  }

  onSubmit() {
    this.taskService.addTask(this.taskForm.value).then(() => {
      this.taskForm = this.formBuilder.group({
        title: [''],
        description: [''],
        category: [TaskCategory[0]],
        deadline: [null]
      });
    });
  }

  signOut() {
    this.router.navigate(['']);
  }
}
